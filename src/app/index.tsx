'use client';

import React from 'react';
import AccountCard from "@/components/AccountCard";
import {accountTypeQueries} from "@/services/queries/account/accountQueries";

function Index() {
    const {
        data: accountTypes,
        isLoading,
        error,
    } = accountTypeQueries.useAllAccountTypes();

    console.log(accountTypes);
    return (
        <div className="container mx-auto my-8">
            <AccountCard />
        </div>
    );
}

export default Index;