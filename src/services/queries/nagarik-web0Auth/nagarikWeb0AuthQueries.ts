import {useMutation} from '@tanstack/react-query';
import {nagarikAuthApi} from "@/services/api/nagarikWeb0Auth";
import {NagarikCheckAuthPostParams} from "@/types/models/ngarikCheckAuth";

export const nagarikWeb0AuthQueries = {
    usePostChallengeHash: () => {
        return useMutation({
            mutationFn: (data: NagarikCheckAuthPostParams) => nagarikAuthApi.postChallengeHash(data),
            onError: (error) => {
                return error.message;
            },
            onSuccess: (data) => {
                return data;
            },
        });
    },
};

