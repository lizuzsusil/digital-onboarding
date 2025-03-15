import {useCallback, useEffect, useState} from "react"
import {Alert, Card, QRCode, Typography, Button} from "antd"
import {ReloadOutlined} from "@ant-design/icons"
import Base64 from "crypto-js/enc-base64"
import {nanoid} from "nanoid";
import sha256 from "crypto-js/sha256";
import {redirectionCodeQueries} from "@/services/queries/redirection-code/redirectionCodeQueries";
import {nagarikWeb0AuthQueries} from "@/services/queries/nagarik-web0Auth/nagarikWeb0AuthQueries";
import {createStompClient, requestAuthorizationCode} from "@/lib/utility/socket";
import Loader from "@/components/Loader";

const {Title, Text} = Typography

interface NagarikAppAuthorizationProps {
    handleSuccess: (data: string) => void
    handleError: (error: string) => void
    eligibilityErrors?: string | null
}

export default function NagarikAppAuthorization({
                                                    handleSuccess,
                                                    handleError,
                                                    eligibilityErrors,
                                                }: NagarikAppAuthorizationProps) {
    const [qrLoading, setQrLoading] = useState<boolean>(true)

    const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)
    const [qrValue, setQrValue] = useState<string>("")

    const {data: redirectionCodeData, refetch: refetchRedirectionCode} = redirectionCodeQueries.useGetRedirectionCode()
    const {
        mutate: checkChallengeHash,
        data: challengeHashData
    } = nagarikWeb0AuthQueries.usePostChallengeHash()

    const fetchRedirectionCode = useCallback(async (type?: string) => {
        setQrLoading(true)
        // setShowRefreshBtn(false)

        if (type === "static") return

        try {
            await refetchRedirectionCode()
        } catch (error) {
            setQrLoading(false)
            console.error("Error fetching redirection code:", error)
        }
    }, [refetchRedirectionCode])

/*    useEffect(() => {
        if (authCode) {
            handleSuccess(authCode)
        }
    }, [authCode, handleSuccess]);*/

    useEffect(() => {
        fetchRedirectionCode().then()
    }, [fetchRedirectionCode])

    useEffect(() => {
        if (redirectionCodeData) {
            const redirectionCode = redirectionCodeData.payload;
            const randomString = nanoid(40);
            const challenge_hash = sha256(randomString);
            const hashBase64 = Base64.stringify(challenge_hash)

            checkChallengeHash(
                {redirection_code: redirectionCode, challenge_hash: hashBase64},
                {
                    onSuccess: (data) => {
                        setQrValue(`client-login::${hashBase64}::${data.tag_number}`)
                        setQrLoading(false)

                        // Initialize socket connection
                        createStompClient(
                            randomString,
                            (response) => {
                                if (response.authorization_code) {
                                    handleSuccess(response.authorization_code)
                                } else {
                                    setShowRefreshBtn(true)
                                    handleError(response as never)
                                    console.log("Cancelled by user")
                                }
                            },
                            (client) => {
                                requestAuthorizationCode(client, randomString)
                            },
                        )
                    },
                    onError: (error) => {
                        setQrLoading(false)
                        console.error("Error checking challenge hash:", error)
                    },
                },
            )
        }
    }, [redirectionCodeData])

    return (
        <div className="row q-col-gutter-md q-mb-md w-full max-w-xl mx-auto">
            {eligibilityErrors && <Alert message={eligibilityErrors} type="error" className="mb-4 w-full" banner/>}

            <Card className="w-full bg-gray-100 rounded-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                        <Title level={5} className="text-lg font-bold">
                            Online Bank Account
                        </Title>

                        <Title level={2} className="text-xl font-bold text-blue-600 mt-4">
                            Authorize {challengeHashData?.client_detail.client_name} to access your Nagarik
                            App Account?
                        </Title>

                        <div className="relative w-[261px] mt-6 mb-6" onClick={() => fetchRedirectionCode("static")}>
                            {qrLoading ? (
                                <div
                                    className="flex justify-center items-center h-[261px] w-[261px] bg-gray-200 rounded-lg">
                                    <Loader size={"small"}/>
                                </div>
                            ) : (
                                <div className="relative">
                                    <QRCode value={qrValue || "Error"} size={261} color={'#000000'} errorLevel="L"/>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<ReloadOutlined/>}
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            fetchRedirectionCode()
                                        }}
                                        className="absolute -top-3 -right-3"
                                    />
                                </div>
                            )}
                        </div>

                        {showRefreshBtn && (
                            <Alert
                                message="QR Code has been invalidated. Please refresh for new one."
                                type="error"
                                className="mb-4"
                            />
                        )}

                        <Text className="text-blue-600 font-semibold text-lg block mb-6">
                            Scan the QR CODE above with your Nagarik App to Continue.
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    )
}

