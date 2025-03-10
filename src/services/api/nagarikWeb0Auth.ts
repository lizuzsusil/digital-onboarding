import {apiNagarikCheckAuth} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {NagarikCheckAuthApiResponse, NagarikCheckAuthPostParams} from "@/types/models/nagarikCheckAuth";

export const nagarikAuthApi = {
    postChallengeHash: async (payload: NagarikCheckAuthPostParams) => {
        const response = await HttpRequest.post<NagarikCheckAuthApiResponse>(apiNagarikCheckAuth, {...payload});
        return response.data
    }
};
