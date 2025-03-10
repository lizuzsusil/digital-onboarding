'use client';

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/gibl-logo.png"
import {accountTypeQueries} from "@/services/queries/account/accountQueries";

function AccountCard() {
    const {
        data: accountTypes
    } = accountTypeQueries.useGetAllAccountTypes();

    return (
        accountTypes?.data.map((accountType, index) => (
            <div className="card" key={index}>
                <div className="imgBx">
                    <Image src={accountType.image_url} loading='lazy'
                           alt={accountType.title} width={200} height={200}
                    />
                </div>
                <div className="contextBx">
                    <h3 className='text-center'>{accountType.title}</h3>
                    <div className="flex justify-between items-center w-full">
                        {accountType.description &&
                            <Link href={accountType.description} className="buy" target={'_blank'}>Learn More</Link>}
                        <Link href="/online-account" className="buy">Apply</Link>
                    </div>
                </div>
            </div>
        ))

    );
}

export default AccountCard;