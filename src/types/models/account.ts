export interface BankAccount {
    name: string;
    account_class: string;
    details_caption1: string;
    details_content1: string;
    details_caption2: string;
    details_content2: string;
    details_caption3: string;
    details_content3: string;
    details_caption4: string;
    details_content4: string;
    description_link: string;
    order: string;
    currency_title: string;
    currency_code: string;
}

export interface BankAccountResponse {
    code: number;
    data: BankAccount[];
    message: string;
}