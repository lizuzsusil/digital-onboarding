"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import NagarikAppAuthorization from "@/components/PageComponents/NagarikAppAuthorization";
import {FormContainerContextProvider} from "@/contexts/FormContainerContext";

function OnlineAccount() {
    const [appAuthorized, setAppAuthorized] = useState(false)
    const [formData, setFormData] = useState<any>({
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
            education_qualification: "Graduate",
            source_of_income: [],
            related_businesses: [
                {
                    name: "",
                    address: "",
                    position: "",
                    approx_remuneration: "",
                },
            ],
            related_colleges: [
                {
                    name: "",
                    address: "",
                    phone: "",
                },
            ],
            anticipated_annual_transaction: "up to 0.1 Million",
            anticipated_no_transaction: "up to 50",
        },
        verification: {
            financial_link: 0,
            criminal_activity: 0,
            politician: 0,
            foreign_country: 0,
            agree_conditions: 1,
        },
    })
    const [eligibilityErrors, setEligibilityErrors] = useState<string | null>(null)
    const [checkAlreadyAppliedData, setCheckAlreadyAppliedData] = useState<any>(null)

    const searchParams = useSearchParams()
    const accountType = searchParams.get("accountType")

    useEffect(() => {
        if (accountType) {
            setFormData((prev: any) => ({
                ...prev,
                account_type_id: accountType,
            }))
        }
    }, [accountType])

    const handleAuthorizationSuccess = (data: any) => {
        setAppAuthorized(true)
        setFormData((prev: any) => ({
            ...prev,
            ...data,
        }))
        setCheckAlreadyAppliedData(data.checkData)
    }

    const handleAuthorizationError = (error: string) => {
        setEligibilityErrors(error)
    }

    const resetAllData = () => {
        setAppAuthorized(false)
        setFormData({
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
                education_qualification: "Graduate",
                source_of_income: [],
                related_businesses: [
                    {
                        name: "",
                        address: "",
                        position: "",
                        approx_remuneration: "",
                    },
                ],
                related_colleges: [
                    {
                        name: "",
                        address: "",
                        phone: "",
                    },
                ],
                anticipated_annual_transaction: "up to 0.1 Million",
                anticipated_no_transaction: "up to 50",
            },
            verification: {
                financial_link: 0,
                criminal_activity: 0,
                politician: 0,
                foreign_country: 0,
                agree_conditions: 1,
            },
        })
        setEligibilityErrors(null)
        setCheckAlreadyAppliedData(null)
    }

    return (
            <div className="flex flex-center">
                {!appAuthorized ? (
                    <NagarikAppAuthorization
                        handleSuccess={handleAuthorizationSuccess}
                        handleError={handleAuthorizationError}
                        eligibilityErrors={eligibilityErrors}
                    />
                ) : (
                    <h1>Test</h1>
                )}
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
