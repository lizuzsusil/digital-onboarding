import {useQuery} from '@tanstack/react-query';
import {accountTypeApi} from "@/services/api/account";
import {QueryKeys} from "@/services/queries/account/accountKeys";
import {QueryConfig} from "@/services/queryConfig";

/*export const accountTypeQueries = {
    useAllAccountTypes: (
        options?: Omit<UseQueryOptions<BankAccount[], Error>, 'queryKey' | 'queryFn'>
    ) => {
        return useQuery<BankAccount[], Error>({
            queryKey: ['account-types'],
            queryFn: accountTypeApi.fetchAll,
            ...QueryConfig
        });
    },
}*/

export const accountTypeQueries = {
    useAllAccountTypes: () => {
        return useQuery({
            queryKey: QueryKeys.ACCOUNT_TYPES,
            queryFn: accountTypeApi.fetchAll,
            ...QueryConfig
        });
    },
};

