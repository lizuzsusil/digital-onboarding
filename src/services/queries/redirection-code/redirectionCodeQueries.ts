import {useQuery} from '@tanstack/react-query';
import {redirectionCodeKeys} from "@/services/queries/redirection-code/redirectionCodeKeys";
import {redirectionCodeApi} from "@/services/api/redirectionCode";

export const redirectionCodeQueries = {
    useGetRedirectionCode: () => {
        return useQuery({
            queryKey: redirectionCodeKeys.REDIRECTION_CODE,
            queryFn: redirectionCodeApi.fetchRedirectionCode,
        });
    },
};

