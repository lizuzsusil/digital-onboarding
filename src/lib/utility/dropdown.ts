export const martialStatusOptions = [
    "Married",
    "Single"].map((status) => ({
    label: status,
    value: status,
}))

export const accountPurposeOptions = [
    "Saving",
    "Payroll",
    "Remittance",
    "Other"].map((account) => ({
    label: account,
    value: account,
}))

export const educationQualificationOptions = [
    "Graduate",
    "Illiterate",
    "Literate",
    "Others",
    "Post Graduate",
    "SLC"].map((data) => ({
    label: data,
    value: data,
}))

export const occupationOptions = [
    'Business',
    'Government Sector',
    'Private Sector',
    'Professional',
    'Public Sector',
    'Others'].map((item) => ({
    label: item,
    value: item,
}))

export const sourceOfIncomeOptions = ['Salary',
    'Sale of Assets',
    'Return on Investments',
    'Remittance',
    'Own Business',
    'Others'].map((item) => ({
    label: item,
    value: item,
}))

export const annualTransactionOptions = ["up to 0.1 Million",
    "up to 0.5 Million",
    "up to 1 Million",
    "up to 5 Million", "Above 5 Million"].map((item) => ({
    label: item,
    value: item,
}))

export const totalTransactionOptions = ["up to 50",
    "up to 100",
    "up to 500",
    "Above 500"].map((item) => ({
    label: item,
    value: item,
}))

export const professionTypeOptions = [
    {
        label: "For Business/Professionals",
        value: 'Professional',
    },
    {
        label: "For Students",
        value: 'Student',
    }
]

export const yesNoOptions = [
    {
        label: 'Yes',
        value: 1
    },
    {
        label: 'No',
        value: 0
    }
]

export const nomineeRelationOptions = ["Son",
    "Daughter",
    "Others"].map((item) => ({
    label: item,
    value: item,
}))

export const requiredServiceOptions = [
    {
        label: "Mobile Banking",
        value: "mobile_banking",
    },
    {
        label: "Internet Banking",
        value: "internet_banking",
    },
    {
        label: "Debit Card",
        value: "debit_card",
    },
    {
        label: "Cheque Book",
        value: "cheque_book",
    }
] as const;

export const otherBankingProductOptions = [
    {
        label: "Credit Card",
        value: "credit_card",
    },
    {
        label: "Locker",
        value: "locker",
    },
    {
        label: "Demat",
        value: "demat",
    },
    {
        label: "Bancassurance",
        value: "bancassurance",
    }
] as const;