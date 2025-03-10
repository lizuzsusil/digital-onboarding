import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import {accountQueryKeys} from "@/services/queries/account/accountKeys";
import AccountCard from "@/components/AccountCard";
import {accountTypeApi} from "@/services/api/account";

export default async function Home() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: accountQueryKeys.ACCOUNT_TYPES,
        queryFn: accountTypeApi.fetchAll,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="container mx-auto my-8">
                <div className="grid grid-cols-4 gap-4">
                    <AccountCard/>
                </div>
            </div>
        </HydrationBoundary>
    )
}