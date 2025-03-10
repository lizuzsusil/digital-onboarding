'use client'
import React, {useEffect, useState} from 'react';
import {FormContainerContextProvider} from "@/contexts/FormContainerContext";
import {Steps, QRCode, Flex} from "antd";
import useMessageContext from "@/lib/hooks/useMessageContext";
import {nanoid} from "nanoid";
import sha256 from 'crypto-js/sha256';
import Base64 from "crypto-js/enc-base64";
import {nagarikWeb0AuthQueries} from "@/services/queries/nagarik-web0Auth/nagarikWeb0AuthQueries";
import {redirectionCodeQueries} from "@/services/queries/redirection-code/redirectionCodeQueries";
import Loader from "@/components/Loader";

const {Step} = Steps;

function OnlineAccount() {
    const {dispatchError} = useMessageContext();

    const {data, isSuccess, isError} = redirectionCodeQueries.useGetRedirectionCode()
    const {
        mutate: postChallengeHash,
        data: mutationData,
        isSuccess: mutationIsSuccess,
        isPending: mutationIsPending,
        isError: mutationIsError,
        error,
    } = nagarikWeb0AuthQueries.usePostChallengeHash()

    const [qrCodeValue, setQrCodeValue] = useState<string>("");

    useEffect(() => {
        if (isSuccess && data) {
            const redirectionCode = data.payload;
            const fortyLengthString = nanoid(40);
            const challenge_hash = sha256(fortyLengthString);
            const challenge_hash_base64 = Base64.stringify(challenge_hash);

            const res = postChallengeHash({
                challenge_hash: challenge_hash_base64,
                redirection_code: redirectionCode,
            });

            setQrCodeValue("client-login::" +
                challenge_hash_base64 +
                "::" +
                res?.data?.tag_number)
        }
    }, [isSuccess, data, postChallengeHash]);

    if (isError) {
        console.log(isError);
        // dispatchError(error.message)
    }

    return (
        <div className="container mx-auto">
            <div className={'w-[265px] h-[265px] m-auto'}>
                <Flex gap="middle" vertical justify="center" align="center" className={'h-full'}>
                    {qrCodeValue ? <QRCode
                        size={256}
                        className={'h-auto w-full'}
                        value={qrCodeValue}
                    /> : <Loader/>}
                </Flex>
            </div>

            {/*<Steps current={currentStep}>
                <Step title={"Fill in your details"}/>
                <Step title={"Address details"}/>
                <Step title={"Review and Save"}/>
            </Steps>
            <main>
                {renderStep(currentStep)}
            </main>*/}
        </div>
    )
}

export default function Page() {
    return (
        <FormContainerContextProvider form={{
            defaultValues: {
                name: '',
                address: ''
            }
        }}>
            <OnlineAccount/>
        </FormContainerContextProvider>
    );
}