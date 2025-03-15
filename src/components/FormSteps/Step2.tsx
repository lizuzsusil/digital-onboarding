import React, {useEffect, useMemo} from 'react';
import useFormContainer from "@/lib/hooks/useFormContainer";
import ReactHookFormField from "@/components/ReactHookForm/ReactHookFormField";
import {Space, Typography} from "antd";
import ReactHookFormSelectField from "@/components/ReactHookForm/ReactHookFormSelectField";
import {locationQueries} from "@/services/queries/location/locationQueries";
import ReactHookFormRadioGroup from "@/components/ReactHookForm/ReactHookFormRadioGroup";
import Button from "@/components/Button";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import useDynamicFieldArray from "@/lib/hooks/useFieldArray";
import {FormPayloadData} from "@/types/models/formData";
import {
    accountPurposeOptions,
    annualTransactionOptions, educationQualificationOptions,
    martialStatusOptions, occupationOptions, professionTypeOptions, sourceOfIncomeOptions,
    totalTransactionOptions
} from "@/lib/utility/dropdown";

const {Title} = Typography

function Step2() {
    const {data: stateData} = locationQueries.useFetchAllStates()
    const {data: districtData} = locationQueries.useFetchAllDistricts()
    const {data: citiesData} = locationQueries.useFetchAllCities()
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
            temporaryAddress: {
                mobile_no: formData.profile.mobile_number
            }
        })
    }, [formData, reset])

    const isMarried = watch('personalInformation.marital_status') === 'Married'

    console.log('step2 getValues', getValues())

    const stateOptions = stateData?.data.map((state) => ({
        label: state.name_combined,
        value: state.id
    }))

    const filteredDistricts = districtData?.data.filter(item => item.state_id === watch("temporaryAddress.state"))
    const districtOptions = filteredDistricts?.map((district) => ({
        label: district.name_combined,
        value: district.code
    }))

    const getDistrictByCode = districtData?.data.find((item) => item.code === watch("temporaryAddress.district"))
    const filteredCities = citiesData?.data.filter(item => item.district_id === getDistrictByCode?.id)
    const cityOptions = filteredCities?.map((city) => ({
        label: city.name_combined,
        value: city.name
    }))

    const businessConfig = useDynamicFieldArray<FormPayloadData>({
        control,
        arrayName: "professionalDetails.related_businesses",
        defaultFields: {name: "", address: "", position: "", approx_remuneration: ""},
    });

    const collegeConfig = useDynamicFieldArray<FormPayloadData>({
        control,
        arrayName: "professionalDetails.related_colleges",
        defaultFields: {name: "", address: "", phone: ""},
    });

    return (
        <div>
            <div className="personal-information">
                <Title level={2}>Personal Information</Title>
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormField control={control} name={"personalInformation.education"} label={"Education"}
                                        rules={{required: {value: true, message: "Education is required"}}}/>
                    <ReactHookFormSelectField control={control} name={"personalInformation.account_purpose"}
                                              label={"Account Purpose"} options={accountPurposeOptions}
                                              rules={{required: {value: true, message: "Account purpose is required"}}}
                    />
                    <ReactHookFormSelectField control={control} name={"personalInformation.marital_status"}
                                              label={"Marital Status"} options={martialStatusOptions}
                                              rules={{required: {value: true, message: "Martial status is required"}}}
                    />
                    <ReactHookFormField control={control} name={"citizenshipInformation.pan"} label={"PAN"}/>
                </div>
            </div>
            <div className="family-details">
                <Title level={2}>Family Details</Title>
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormField control={control} name={"familyDetails.father_name"} label={"Father Name"}
                                        rules={{required: {value: true, message: "Father name is required"}}}/>
                    <ReactHookFormField control={control} name={"familyDetails.mother_name"} label={"Mother Name"}
                                        rules={{required: {value: true, message: "Mother name is required"}}}/>
                    <ReactHookFormField control={control} name={"familyDetails.grandfather_name"}
                                        label={"Grandfather Name"}
                                        rules={{required: {value: true, message: "Grandfather name is required"}}}/>
                    {isMarried &&
                        <>
                            <ReactHookFormField control={control} name={"familyDetails.spouse_name"}
                                                label={"Spouse Name"}
                                                rules={isMarried ? {
                                                    required: {
                                                        value: true,
                                                        message: "Spouse name is required"
                                                    }
                                                } : undefined}/>
                            <ReactHookFormField control={control} name={"familyDetails.son"} label={"Son"}/>
                            <ReactHookFormField control={control} name={"familyDetails.daughter"} label={"Daughter"}/>
                        </>
                    }
                </div>
            </div>
            <div className="temporary-address">
                <Title level={2}>Temporary Address</Title>
                {/*<Switch onChange={handleTempAddress}/>*/}
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormSelectField control={control} name={"temporaryAddress.state"}
                                              label={"State"} options={stateOptions ?? []}
                                              rules={{required: {value: true, message: "State is required"}}}/>
                    <ReactHookFormSelectField control={control} name={"temporaryAddress.district"}
                                              label={"District"} options={districtOptions ?? []}
                                              disabled={!watch("temporaryAddress.state")}
                                              rules={{required: {value: true, message: "District is required"}}}/>
                    <ReactHookFormSelectField control={control} name={"temporaryAddress.municipality_vdc"}
                                              label={"Municipality/VDC"} options={cityOptions ?? []}
                                              disabled={!watch("temporaryAddress.district")}
                                              rules={{
                                                  required: {
                                                      value: true,
                                                      message: "Municipality/VDC is required"
                                                  }
                                              }}/>
                    <ReactHookFormField control={control} name={"temporaryAddress.ward_no"} label={"Ward No"}
                                        rules={{required: {value: true, message: "Ward no is required"}}}/>
                    <ReactHookFormField control={control} name={"temporaryAddress.street"} label={"Street"}
                                        rules={{required: {value: true, message: "Street is required"}}}/>
                    <ReactHookFormField control={control} name={"temporaryAddress.house_no"} label={"House No."}/>
                    <ReactHookFormField control={control} name={"temporaryAddress.resident_ph_no"}
                                        label={"Resident Phone No."}/>
                    <ReactHookFormField control={control} name={"temporaryAddress.office_ph_no"}
                                        label={"Office Phone No."}/>
                    <ReactHookFormField control={control} name={"temporaryAddress.mobile_no"} label={"Mobile No."}
                                        rules={{required: {value: true, message: "Mobile no is required"}}} disabled/>
                </div>
            </div>
            <div className="professional-details">
                <Title level={2}>Professional Details</Title>
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormRadioGroup control={control} name="professionalDetails.profession"
                                             options={professionTypeOptions}/>
                    <ReactHookFormSelectField control={control} name={"professionalDetails.education_qualification"}
                                              label={"Education Qualification"}
                                              options={educationQualificationOptions ?? []}
                                              rules={{
                                                  required: {
                                                      value: true,
                                                      message: "Qualification is required"
                                                  }
                                              }}/>
                </div>
            </div>
            <div className="professional">
                <Title level={2}>For Business / Professionals</Title>
                <div className="grid grid-cols-3 gap-4">
                    <ReactHookFormSelectField control={control} name={"professionalDetails.occupation"}
                                              label={"Occupation"}
                                              options={occupationOptions ?? []}
                                              rules={{
                                                  required: {
                                                      value: true,
                                                      message: "Occupation is required"
                                                  }
                                              }}/>
                    <ReactHookFormSelectField control={control} name={"professionalDetails.source_of_income"}
                                              label={"Source of Income"}
                                              options={sourceOfIncomeOptions ?? []}
                                              mode={"multiple"}
                                              rules={{
                                                  required: {
                                                      value: true,
                                                      message: "Source of income is required"
                                                  }
                                              }}/>
                </div>
                <div className="grid">
                    <Title level={2}>Detail of Related Profession/Business</Title>
                    {businessConfig.fields.map((business, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-start">
                            <div className="md:col-span-3">
                                <ReactHookFormField
                                    control={control}
                                    name={`professionalDetails.related_businesses.${index}.name`}
                                    label="Name of Employer/Business"
                                    rules={{required: "Name is required"}}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <ReactHookFormField
                                    control={control} name={`professionalDetails.related_businesses.${index}.address`}
                                    label="Address"/>
                            </div>

                            <div className="md:col-span-3">
                                <ReactHookFormField
                                    control={control} name={`professionalDetails.related_businesses.${index}.position`}
                                    label="Position"/>
                            </div>

                            <div className="md:col-span-3">
                                <ReactHookFormField
                                    control={control}
                                    name={`professionalDetails.related_businesses.${index}.approx_remuneration`}
                                    label="Approx. Yearly Remuneration (NRS.)"
                                />
                            </div>
                            <Space>
                                {index > 0 && (
                                    <Button
                                        type="primary"
                                        danger
                                        shape="circle"
                                        icon={<MinusOutlined/>}
                                        onClick={() => businessConfig.removeItem(index)}
                                    />
                                )}
                                {index === businessConfig.fields.length - 1 && (
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<PlusOutlined/>}
                                        onClick={businessConfig.addItem}
                                    />
                                )}
                            </Space>
                        </div>
                    ))}
                </div>
                <div className="grid">
                    <Title level={2}>Detail of Related College / Institution</Title>
                    {collegeConfig.fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-start">
                            <div className="md:col-span-4">
                                <ReactHookFormField
                                    control={control}
                                    name={`professionalDetails.related_colleges.${index}.name`}
                                    label="College Name"
                                    rules={{required: "Name is required"}}
                                />
                            </div>
                            <div className="md:col-span-4">
                                <ReactHookFormField
                                    control={control}
                                    name={`professionalDetails.related_colleges.${index}.address`}
                                    label="Address"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <ReactHookFormField
                                    control={control}
                                    name={`professionalDetails.related_colleges.${index}.phone`}
                                    label="Phone"
                                />
                            </div>
                            <div className="md:col-span-1 flex items-end justify-center pt-8">
                                <Space>
                                    {index > 0 && (
                                        <Button
                                            type="primary"
                                            danger
                                            shape="circle"
                                            icon={<MinusOutlined/>}
                                            onClick={() => collegeConfig.removeItem(index)}
                                        />
                                    )}
                                    {index === collegeConfig.fields.length - 1 && (
                                        <Button
                                            type="primary"
                                            shape="circle"
                                            icon={<PlusOutlined/>}
                                            onClick={collegeConfig.addItem}
                                        />
                                    )}
                                </Space>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="transaction-volume">
                <Title level={3}>Anticipated Volume Of Transaction</Title>
                <div className="card-transaction">
                    <Title level={2}>
                        Anticipated Annual Transaction (Debit/Credit) NPR
                    </Title>
                    <ReactHookFormRadioGroup control={control} name={'professionalDetails.anticipated_annual_transaction'} options={annualTransactionOptions}
                                             rules={{required: {value: true, message: "Annual transaction is required"}}}
                    />
                </div>
                <div className="total-transaction">
                    <Title level={2}>
                        Anticipated Number Of Annual Transaction
                    </Title>
                    <ReactHookFormRadioGroup control={control} name={'professionalDetails.anticipated_no_transaction'} options={totalTransactionOptions}
                                             rules={{required: {value: true, message: "Total transaction is required"}}}/>
                </div>
            </div>
        </div>
    );
}

export default Step2;