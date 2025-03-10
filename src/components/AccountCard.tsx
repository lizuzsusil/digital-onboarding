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
                    <Image src={Logo} loading='lazy'
                           alt={accountType.name}
                    />
                </div>
                <div className="contextBx">
                    <h3 className='text-center'>{accountType.name}</h3>
                    <h2 className="price">{accountType.details_content1}</h2>
                    <hr/>
                    <div>
                        <div className="label">
                            Born On or After 1995 AD
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <Link href={accountType.description_link} className="buy" target={'_blank'}>Learn More</Link>
                        <Link href="/online-account" className="buy">Apply</Link>
                    </div>
                </div>
            </div>
        ))

    );
}

export default AccountCard;