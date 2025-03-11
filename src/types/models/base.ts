export interface PrimaryBase {
    id: number
}

export interface TimeStampCreatedBase {
    created_date: string;
}

export interface TimeStampUpdatedBase {
    updated_date: string;
}

export interface TimeStampDeletedBase {
    deleted_date: string;
}

export interface TimeStampBase {
    created_at: string;
    updated_at: string;
    deleted_at: string;
}