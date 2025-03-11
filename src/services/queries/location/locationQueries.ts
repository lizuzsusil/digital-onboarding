import {useQuery} from '@tanstack/react-query';
import {citizenDetailsApi} from "@/services/api/citizenDetails";
import {citizenDetailKeys} from "@/services/queries/citizen-detail/citizenDetailKeys";

export const citizenDetailQueries = {
    useFetchCitizenDetails: (authorization_code: string) => {
        return useQuery({
            queryKey: [citizenDetailKeys.CITIZENSHIP_DETAILS, authorization_code],
            queryFn: () => citizenDetailsApi.fetchCitizenDetails(authorization_code),
            enabled: !!authorization_code,
        });
    },
};