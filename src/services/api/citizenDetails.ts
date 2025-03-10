import {apiFetchCitizenshipDetails} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {NagarikCitizenshipDetailResponse} from "@/types/models/citizenDetails";

export const citizenDetailsApi = {
    fetchCitizenDetails: async (payload: string) => {
        const response = await HttpRequest.get<NagarikCitizenshipDetailResponse>(apiFetchCitizenshipDetails, {authorization_code: payload});
        return response.data
    }
};
