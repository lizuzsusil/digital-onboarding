import {useQuery} from '@tanstack/react-query';
import {accountTypeApi} from "@/services/api/account";
import {accountQueryKeys} from "@/services/queries/account/accountKeys";

/*export const accountTypeQueries = {
    useAllAccountTypes: (
        options?: Omit<UseQueryOptions<BankAccount[], Error>, 'queryKey' | 'queryFn'>
    ) => {
        return useQuery<BankAccount[], Error>({
            queryKey: ['account-types'],
            queryFn: accountTypeApi.fetchAll,
        });
    },
}*/

export const accountTypeQueries = {
    useGetAllAccountTypes: () => {
        return useQuery({
            queryKey: accountQueryKeys.ACCOUNT_TYPES,
            queryFn: accountTypeApi.fetchAll
        });
    },
};

