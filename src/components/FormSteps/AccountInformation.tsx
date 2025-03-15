import React, {useEffect, useMemo} from 'react';
import useFormContainer from "@/lib/hooks/useFormContainer";
import ReactHookFormField from "@/components/ReactHookForm/ReactHookFormField";
import {Typography} from "antd";
import ReactHookFormSelectField from "@/components/ReactHookForm/ReactHookFormSelectField";
import {locationQueries} from "@/services/queries/location/locationQueries";
import ReactHookFormRadioGroup from "@/components/ReactHookForm/ReactHookFormRadioGroup";
import {FormPayloadData} from "@/types/models/formData";
import {
    accountPurposeOptions,
    yesNoOptions,
    nomineeRelationOptions,
    otherBankingProductOptions,
    requiredServiceOptions,
} from "@/lib/utility/dropdown";
import ReactHookFormCheckBox from "@/components/ReactHookForm/ReactHookFormCheckbox";
import ReactHookFormDatePicker from "@/components/ReactHookForm/ReactHookFormDatePicker";

const {Title} = Typography

function AccountInformation() {
    const {data: districtData} = locationQueries.useFetchAllDistricts()
    const {
        form: {
            watch,
            reset,
            control,
            getValues,
        }
    } = useFormContainer<FormPayloadData>()

    const formData = useMemo(() => {
        return getValues()
    }, [getValues]);

    useEffect(() => {
        reset({
            ...formData,
        })
    }, [formData, reset])

    const filteredDistricts = districtData?.data.filter(item => item.state_id === watch("temporaryAddress.state"))
    const districtOptions = filteredDistricts?.map((district) => ({
        label: district.name_combined,
        value: district.code
    }))

    return (
        <div>
            <div className="account-information">
                <Title level={2}>Select Branch</Title>
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormSelectField control={control} name={"accountDetails.bank_branch"}
                                              label={"Select Branch"} options={accountPurposeOptions}
                                              rules={{required: {value: true, message: "Branch is required"}}}
                    />
                </div>
            </div>
            <div className="family-details">
                <Title level={2}>Nominee&#39;s Detail</Title>
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormRadioGroup control={control} label={"Do you want to declare a nominee?"}
                                             name={"accountDetails.declare_nominee"} options={yesNoOptions}/>
                    <>
                        <ReactHookFormCheckBox single control={control}
                                               name={"accountDetails.declare_nominee_authorize"}
                                               label={"I hereby authorize following nominee to receive sum of amount which maybe be due to me from NMB in the event of my death. *"}/>
                        <ReactHookFormField control={control} name={"accountDetails.nominee_name"}
                                            label={"Nominee name"}/>
                        <ReactHookFormSelectField control={control} name={"accountDetails.bank_branch"}
                                                  label={"Relation to me"} options={nomineeRelationOptions}
                                                  rules={{required: {value: true, message: "Relation is required"}}}
                        />
                        <ReactHookFormDatePicker fullWidth control={control} name={"accountDetails.nominee_dob_ad"}
                                                 label={"Date of Birth(A.D.)"}/>

                        <ReactHookFormField control={control} name={"accountDetails.nominee_contact"}
                                            label={"Contact No"}/>
                        <ReactHookFormField control={control} name={"accountDetails.nominee_address"}
                                            label={"Permanent Address"}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Address is required"
                                                }
                                            }}/>
                        <ReactHookFormField control={control} name={"accountDetails.nominee_citizenship_no"}
                                            label={"Citizenship No."}/>
                        <ReactHookFormField control={control}
                                            name={"accountDetails.nominee_citizenship_issued_district"}
                                            label={"Citizenship Issued District"}/>
                        <ReactHookFormDatePicker fullWidth control={control}
                                                 name={"accountDetails.nominee_citizenship_issued_date"}
                                                 label={"Citizenship Issued Date(A.D.)"}/>
                    </>
                </div>
            </div>
            <div className="required-services">
                <Title level={2}>Required Services</Title>
                <div className="grid grid-cols-12 gap-4">
                    {requiredServiceOptions.map((option) =>
                        <ReactHookFormCheckBox
                            key={option.value} control={control}
                            name={`accountDetails.${option.value}`}
                            label={option.label}
                            options={districtOptions ?? []}
                            rules={{required: {value: true, message: "District is required"}}}
                        />)
                    }
                </div>
            </div>
            <div className="other-banking-products">
                <Title level={2}>Other Banking Products</Title>
                <div className="grid grid-cols-12 gap-4">
                    {otherBankingProductOptions.map((option) =>
                        <ReactHookFormCheckBox
                            key={option.value} control={control}
                            name={`accountDetails.${option.value}`}
                            label={option.label}
                            options={districtOptions ?? []}
                            rules={{required: {value: true, message: "District is required"}}}
                        />)
                    }
                </div>
            </div>
        </div>
    );
}

export default AccountInformation;