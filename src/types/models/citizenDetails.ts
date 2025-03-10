export interface NagarikCitizenshipDetailResponse {
    code: number;
    data: NagarikCitizenshipDetail;
    personalDetails: NagarikPersonalDetails;
    verifying_doc: string;
    message: string;
    checkData: unknown;
}

export interface NagarikCitizenshipDetail {
    nullValues: number;
    citizenship_cd: string;
    citizenship_no: string;
    ctz_type_cd: string;
    ctz_status_cd: string | null;
    ctz_type_eng: string;
    ctz_type_loc: string;
    first_name_eng: string;
    middle_name_eng: string | null;
    last_name_eng: string;
    first_name_loc: string;
    middle_name_loc: string | null;
    last_name_loc: string;
    full_name_eng: string;
    full_name_loc: string;
    birth_dt: string;
    birth_dt_loc: string;
    issued_district_cd: number;
    ctz_issue_dt: string;
    ctz_issue_dt_loc: string;
    gender_cd: number;
    gender_eng: string;
    gender_loc: string;
    per_ward_no: string;
    per_area_loc: string | null;
    per_area_eng: string | null;
    per_district_cd: string;
    per_vdc_mun_cd: string;
    per_vdc_mun_eng: string;
    per_vdc_mun_loc: string;
    birth_ward_no: string;
    birth_area_eng: string | null;
    birth_area_loc: string | null;
    birth_district_cd: string;
    birth_vdc_mun_cd: string;
    father_full_name_eng: string;
    father_full_name_loc: string;
    father_ctzhip_no: string | null;
    father_ctz_type_cd: string;
    father_district_cd: string;
    father_vdc_mun_cd: string;
    father_ward_no: string;
    father_area_eng: string;
    father_area_loc: string;
    mother_full_name_eng: string;
    mother_full_name_loc: string;
    mother_ctzhip_no: string | null;
    mother_ctz_type_cd: string | null;
    mother_district_cd: string | null;
    mother_vdc_mun_cd: string | null;
    mother_ward_no: string | null;
    mother_area_eng: string | null;
    mother_area_loc: string | null;
    spouse_full_name_eng: string;
    spouse_full_name_loc: string;
    spouse_ctzhip_no: string | null;
    spouse_ctz_type_cd: string | null;
    spouse_district_cd: string | null;
    spouse_vdc_mun_cd: string | null;
    spouse_ward_no: string | null;
    spouse_area_eng: string | null;
    spouse_area_loc: string | null;
    husband_full_name_eng: string;
    husband_full_name_loc: string;
    approved_by_loc: string;
    approved_position_loc: string;
    office_name_eng: string;
    office_name_loc: string;
    office_name_short_eng: string;
    office_name_short_loc: string;
    ctz_flag: string;
    issued_district_eng: string | null;
    issued_district_np: string | null;
    birth_district_eng: string | null;
    birth_district_np: string | null;
}

export interface NagarikPersonalDetails {
    genderEnum: string;
    status: string | null;
    email: string;
    mobile_number: string;
    full_name_eng: string;
    full_name_np: string;
    date_of_birth_nepali: string;
    date_of_birth_english: string;
    citizen_basic_detail_id: number;
    is_password_change_required: boolean | null;
    verification_document: string;
    profile_image: string;
    profile_image_status: string | null;
    dynamic_screen_shot: string | null;
    linked_documents: string[];
    linked_document_numbers: LinkedDocumentNumbers[];
}

export interface LinkedDocumentNumbers {
    identity_type: string;
    document_number: string[];
}
