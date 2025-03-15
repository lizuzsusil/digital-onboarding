import React, {useEffect, useMemo} from 'react';
import Image from "next/image";
import {Typography} from "antd";
import {nepaliNumberToEnglish} from "@/lib/utility/functions";
import {locationQueries} from "@/services/queries/location/locationQueries";
import useFormContainer from "@/lib/hooks/useFormContainer";
import {FormPayloadData} from "@/types/models/formData";

const {Title} = Typography;

function PrefilledInformation() {
    const {
        form: {
            getValues,
            reset,
        }
    } = useFormContainer<FormPayloadData>()

    const formData = useMemo(() => {
        return getValues()
    }, [getValues]);

    const {data: districtById} = locationQueries.useFetchDistrictById(formData.allresponse.birth_district_cd)
    const {data: stateData} = locationQueries.useFetchAllStates()

    const getStateName = stateData?.data.find((state) => state.id === districtById?.data[0].state_id)

    const salutation = formData.profile.genderEnum === 'MALE' ? "Mr." : formData.profile.genderEnum === 'FEMALE' ? "Mrs." : ""

    const englishCitizenshipNumber = nepaliNumberToEnglish(formData.allresponse.citizenship_no)

    useEffect(() => {
        reset({
            ...formData,
            citizenshipInformation: {
                citizenship_no: englishCitizenshipNumber,
                date_of_issue_ad: formData.allresponse.ctz_issue_dt_loc,
                date_of_issue_bs: formData.allresponse.ctz_issue_dt,
                office_of_issue: formData.allresponse.office_name_eng,
                place_of_issue: (formData.allresponse.issued_district_cd).toString(),
            },
            familyDetails: {
                father_name: "",
                grandfather_name: "",
                mother_name: "",
                spouse_name: ""
            },
            personalInformation: {
                account_purpose: "",
                account_type: "Saving",
                currency: "NPR",
                dob_ad: formData.allresponse.birth_dt,
                dob_bs: formData.allresponse.birth_dt_loc,
                education: "",
                email: formData.profile.email,
                nationality: "Nepali",
                gender: formData.profile.genderEnum,
                intitial: salutation,
                first_name: formData.allresponse.first_name_eng,
                middle_name: formData.allresponse.middle_name_eng,
                last_name: formData.allresponse.last_name_eng,
                marital_status: "",
                profile_image: formData.profile.profile_image
            },
            permanentAddress: {
                district: districtById?.data[0].code,
                districtng: formData.allresponse.per_district_cd,
                house_no: "",
                mobile_no: formData.profile.mobile_number,
                municipality_vdc: formData.allresponse.per_vdc_mun_eng,
                office_ph_no: "",
                resident_ph_no: "",
                state: districtById?.data[0].state_id,
                street: "",
                ward_no: formData.allresponse.per_ward_no
            }
        })
    }, [englishCitizenshipNumber, formData, reset, salutation])

    return (
        <div>
            <div className="personal-info">
                <Title level={4}>Personal Details</Title>
                <div>
                    <Image src={formData.profile.profile_image}
                           alt={`profile image of ${salutation} ${formData.profile.full_name_eng}`}
                           width={150}
                           height={150}/>
                </div>
                <div>
                    <label>Full name</label>
                    <p>{`${salutation} ${formData.profile.full_name_eng}`}</p>
                </div>
                <div>
                    <label>Mobile Number</label>
                    <p>{formData.profile.mobile_number}</p>
                </div>
                <div>
                    <label>DOB (AD)</label>
                    <p>{formData.profile.date_of_birth_english}</p>
                </div>
                <div>
                    <label>DOB (BS)</label>
                    <p>{formData.profile.date_of_birth_nepali}</p>
                </div>
                <div>
                    <label>Full name</label>
                    <p>{formData.profile.mobile_number}</p>
                </div>
                <div>
                    <label>Full name</label>
                    <p>{formData.profile.mobile_number}</p>
                </div>
                <div>
                    <label>Currency</label>
                    <p>NPR</p>
                </div>
            </div>
            <div className="citizenship-info border-t-2">
                <Title level={4}>Citizenship Details</Title>
                <div>
                    <label>Citizenship No</label>
                    <p>{englishCitizenshipNumber}</p>
                </div>
                <div>
                    <label>Issuing District</label>
                    <p>{districtById?.data[0].name_combined}</p>
                </div>
                <div>
                    <label>Issuing Office</label>
                    <p>{formData.allresponse.office_name_eng}</p>
                </div>
                <div>
                    <label>Date of Issue (A.D.)</label>
                    <p>{(formData.allresponse.ctz_issue_dt).slice(0, 10)}</p>
                </div>
                <div>
                    <label>Date of Issue (B.S.)</label>
                    <p>{formData.allresponse.ctz_issue_dt_loc}</p>
                </div>
            </div>
            <div className="permanent-address border-t-2">
                <Title level={4}>Permanent Address</Title>
                <div>
                    <label>State</label>
                    <p>{getStateName?.name_combined}</p>
                </div>
                <div>
                    <label>District</label>
                    <p>{districtById?.data[0].name_combined}</p>
                </div>
                <div>
                    <label>Municipality/VDC</label>
                    <p>{formData.allresponse.per_vdc_mun_eng}</p>
                </div>
                <div>
                    <label>Ward No</label>
                    <p>{formData.allresponse.per_ward_no}</p>
                </div>
                <div>
                    <label>Mobile Number</label>
                    <p>{formData.profile.mobile_number}</p>
                </div>
            </div>
        </div>
    );
}

export default PrefilledInformation;