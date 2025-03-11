import {TimeStampCreatedBase} from "@/types/models/base";

export interface NagarikCheckAuthPostParams {
    challenge_hash: string;
    redirection_code: string;
}

interface ProviderMiniResource {
    code: string;
    address: string;
    status: string | null;
    organization_name: string;
    contact_number: string | null;
    identity_type: string | null;
    provider_id: number;
    logo_image_url: string | null;
    provider_service_name: string | null;
}

interface ProviderApisResource extends TimeStampCreatedBase {
    code: string;
    status: string;
    method: string;
    api_name: string;
    api_description: string;
    provider_api_id: number;
}

interface RequestedApi {
    provider_mini_resource: ProviderMiniResource;
    provider_apis_resource: ProviderApisResource[];
}

interface ClientDetail extends TimeStampCreatedBase {
    status: string | null;
    code: string;
    client_name: string;
    logo_image_url: string;
    purpose: string;
    title_eng: string | null;
    title_np: string | null;
    message_np: string | null;
    message_eng: string | null;
}

export interface NagarikCheckAuthApiResponse {
    challenge_token: string;
    requested_apis: RequestedApi[];
    client_detail: ClientDetail;
    expires_in: string;
    tag_number: number;
    sms_otp_required: boolean;
}
