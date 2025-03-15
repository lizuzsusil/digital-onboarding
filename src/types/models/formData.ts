import {NagarikCitizenshipDetail, NagarikPersonalDetails} from "@/types/models/citizenDetails";

export interface FormPayloadData {
    verifying_doc: string;
    allresponse: NagarikCitizenshipDetail;
    profile: NagarikPersonalDetails;
    authorization_code: string;
    personalInformation: PersonalInformation;
    account_type_id: number;
    citizenshipInformation: CitizenshipInformation;
    passportInformation: Record<string, unknown>;
    voterInformation: Record<string, unknown>;
    permanentAddress: Address;
    temporaryAddress: Address;
    familyDetails: FamilyDetails;
    accountDetails: AccountDetails;
    documents: Documents;
    professionalDetails: ProfessionalDetails;
    verification: Verification;
}

interface PersonalInformation {
    profile_image: string;
    email: string;
    currency: string;
    intitial: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    dob_ad: string;
    dob_bs: string;
    gender: string;
    marital_status: string;
    nationality: string;
    education: string;
    account_type: string;
    account_purpose: string;
}

interface CitizenshipInformation {
    citizenship_no: string;
    place_of_issue: string;
    office_of_issue: string;
    date_of_issue_ad: string;
    date_of_issue_bs: string;
    pan: string;
}

interface Address {
    municipality_vdc: string;
    district: string;
    districtng: string;
    house_no: string;
    street: string;
    ward_no: string;
    resident_ph_no: string;
    office_ph_no: string;
    mobile_no: string;
    state: number;
}

interface FamilyDetails {
    spouse_name: string;
    father_name: string;
    mother_name: string;
    grandfather_name: string;
    daughter: string;
    son: string;
}

interface AccountDetails {
    mobile_banking_services: string | null;
    internet_banking_services: string | null;
    mobile_banking: number;
    internet_banking: number;
    debit_card: number;
    cheque_book: number;
    credit_card: number;
    credit_card_services: string | null;
    card_collection_branch: string | null;
    locker: number;
    demat: number;
    bancassurance: number;
    bank_branch: number;
    declare_nominee: number;
    declare_nominee_authorize: number;
    nominee_name: string;
    relation_to_me: string;
    nominee_dob_ad: string;
    nominee_contact: string;
    nominee_address: string;
    nominee_citizenship_no: string;
    nominee_citizenship_issued_district: string;
    nominee_citizenship_issued_date: string;
}

interface Documents {
    electricity_bill: string;
}

interface ProfessionalDetails {
    profession: string;
    occupation: string;
    education_qualification: string;
    source_of_income: string[];
    related_businesses: RelatedBusiness[];
    related_colleges: RelatedCollege[];
    anticipated_annual_transaction: string;
    anticipated_no_transaction: string;
}

export interface RelatedBusiness {
    name: string;
    address: string;
    position: string;
    approx_remuneration: string;
}

export interface RelatedCollege {
    name: string;
    address: string;
    phone: string;
}

interface Verification {
    financial_link: number;
    criminal_activity: number;
    foreign_country: number;
    agree_conditions: number;
    politician: number;
}
