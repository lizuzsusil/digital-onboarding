export interface BankAccountModel {
    id: number;
    account_type_category_id: number | null;
    title: string;
    code: string;
    interest: number | null;
    description: string | null;
    additionalBenefits: string | null;
    eligibility: string | null;
    min_balance: number | null;
    insurance: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    image_url: string;
}

export interface BankAccountResponse {
    code: number;
    data: BankAccountModel[];
    message: string;
}