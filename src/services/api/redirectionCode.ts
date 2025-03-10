import {apiFetchRedirectionCode} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {FetchRedirectionCodeResponse} from "@/types/models/redirectionCode";

export const redirectionCodeApi = {
    fetchRedirectionCode: async () => {
        const response = await HttpRequest.get<FetchRedirectionCodeResponse>(apiFetchRedirectionCode);
        return response.data
    }
};
