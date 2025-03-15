import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {BankAccountModel} from "@/types/models/account";

function AccountCard({accountDetail}: { accountDetail: BankAccountModel }) {
    const createQueryString = (name: string, value: number) => {
        const params = new URLSearchParams()
        params.set(name, String(value))

        return params.toString()
    }

    return (
        <div className="card">
            <div className="imgBx">
                <Image src={accountDetail.image_url} loading='lazy'
                       alt={accountDetail.title} width={200} height={150}
                />
            </div>
            <div className="contextBx">
                <h3 className='text-center'>{accountDetail.title}</h3>
                <div className="flex justify-between items-center w-full">
                    {accountDetail.description &&
                        <Link href={accountDetail.description} className="buy" target={'_blank'}>Learn More</Link>}
                    <Link
                        href={`/nagarik-app-online-account?${createQueryString('accountType', accountDetail.id)}`}
                        className="buy">
                        Apply
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AccountCard;