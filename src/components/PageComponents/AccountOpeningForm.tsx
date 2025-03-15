import {useState} from "react"
import {Typography, Select, Card, Steps} from "antd"
import {accountTypeQueries} from "@/services/queries/account/accountQueries";
import {BankAccountModel} from "@/types/models/account";
import {useSearchParams} from 'next/navigation'
import {FormContainerContextProvider} from "@/contexts/FormContainerContext";
import useFormContainer from "@/lib/hooks/useFormContainer";
import PrefilledInformation from "@/components/FormSteps/PrefilledInformations";
import {NagarikCitizenshipDetailResponse} from "@/types/models/citizenDetails";
import Step2 from "@/components/FormSteps/Step2";
import Button from "@/components/Button";
import {FormPayloadData} from "@/types/models/formData";
import AccountInformation from "@/components/FormSteps/AccountInformation";
import Verification from "@/components/FormSteps/Verification";

const {Title} = Typography

interface AccountOpeningFormProps {
    citizenshipDetailResponse: NagarikCitizenshipDetailResponse,
    authCode: string
}

const AccountOpeningFormPage = () => {
    const searchParams = useSearchParams()
    const [current, setCurrent] = useState(0)

    const {
        data: accountTypes
    } = accountTypeQueries.useGetAllAccountTypes();

    const {
        form: {
            getValues,
            handleSubmit,
            trigger,
        }
    } = useFormContainer<FormPayloadData>()

    const next = async () => {
        const isValid = await trigger()

        if (isValid) {
            if (current === 3) {
                // Submit form
                const formValues = getValues()
                console.log("finalData", formValues)
                // submitForm(formValues, {
                //     onSuccess: () => {
                //         setCurrent(current + 1)
                //     },
                // })
            } else {
                setCurrent(current + 1)
            }
        }
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const steps = [
        {
            title: "Prefilled Information",
            icon: "/personal_info.svg",
            content: <PrefilledInformation/>,
        },
        {
            title: "Professional Details",
            icon: "/professionalDetails.svg",
            content: <Step2/>,
        },
        {
            title: "Account Details",
            icon: "/accountDetail.svg",
            content: <AccountInformation/>,
        },
        {
            title: "Verification",
            icon: "/verification.svg",
            content: <Verification/>,
        },
        {
            title: "Complete",
            icon: "/complete.svg",
            content: <h1>Complete Information</h1>,
        },
    ]

    const accountTypeOptions = accountTypes?.data.map((accountType: BankAccountModel) => ({
        value: accountType.id,
        label: accountType.title,
    }))

    return (
        <>
            <section className="text-white py-16 mb-8 rounded-lg">
                <div className="container mx-auto">
                    <Title level={1} className="text-white mb-4 text-center">
                        Account Opening Form
                    </Title>

                    <div className="flex justify-center mt-4">
                        <Select
                            style={{width: 350}}
                            placeholder="Account Type"
                            value={Number(searchParams.get("accountType"))}
                            options={accountTypeOptions}
                        />
                    </div>
                    <form onSubmit={handleSubmit(() => {
                    })}>
                        <Card className="w-full">
                            <Steps
                                current={current}
                                items={steps.map((step) => ({
                                    title: step.title,
                                }))}
                                className="mb-8"
                            />

                            <div className="steps-content p-4">{steps[current].content}</div>

                            <div className="steps-action mt-6 flex justify-between">
                                {current > 0 && <Button onClick={prev}>Back</Button>}

                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={next} loading={false}>
                                        {current === 3 ? "Submit" : "Proceed"}
                                    </Button>
                                )}

                                {current === 0 && <div></div>}
                            </div>
                        </Card>
                    </form>
                </div>
            </section>
        </>
    )
}


export default function AccountOpeningForm({citizenshipDetailResponse, authCode}: AccountOpeningFormProps) {
    const searchParams = useSearchParams()

    return (
        <FormContainerContextProvider<FormPayloadData, never> form={{
            defaultValues: {
                account_type_id: Number(searchParams.get('accountType')),
                verifying_doc: citizenshipDetailResponse.verifying_doc,
                allresponse: citizenshipDetailResponse.data,
                profile: citizenshipDetailResponse?.personalDetails,
                authorization_code: authCode,
                personalInformation: {},
                citizenshipInformation: {},
                passportInformation: {},
                permanentAddress: {},
                temporaryAddress: {},
                familyDetails: {},
                accountDetails: {
                    mobile_banking: 0,
                    internet_banking: 0,
                    debit_card: 0,
                    cheque_book: 0,
                    credit_card: 0,
                    locker: 0,
                    demat: 0,
                    bancassurance: 0,
                    declare_nominee: 0,
                    declare_nominee_authorize: 0,
                },
                professionalDetails: {
                    profession: "Professional",
                    related_businesses: [{
                        name: '',
                        address: '',
                        position: '',
                        approx_remuneration: ''
                    }],
                    related_colleges: [{name: "", address: "", phone: ""}],
                    anticipated_annual_transaction: "up to 0.1 Million",
                    anticipated_no_transaction: "up to 50"
                },
                verification: {
                    financial_link: 0,
                    criminal_activity: 0,
                    foreign_country: 0,
                    agree_conditions: 1,
                    politician: 0,
                    criminal_activity_desc: ''
                },
            }
        }}>
            <AccountOpeningFormPage/>
        </FormContainerContextProvider>
    );
}

