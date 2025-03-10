import {apiNagarikCheckAuth} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {NagarikCheckAuthPostParams} from "@/types/models/ngarikCheckAuth";

export const nagarikAuthApi = {
    postChallengeHash: async (payload: NagarikCheckAuthPostParams) => {
        const response = await HttpRequest.post<NagarikCheckAuthPostParams>(apiNagarikCheckAuth, {...payload});
        return response.data
    }
};
