import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/gibl-logo.png"

function AccountCard() {
    return (
        <div className="card">
            <div className="imgBx">
                <Image src={Logo} loading='lazy'
                       alt="SIDDHARTHA GEN-Z SAVING ACCOUNT-SVZA"
                />
            </div>
            <div className="contextBx">
                <h3 className='text-center'>SIDDHARTHA GEN-Z SAVING ACCOUNT-SVZA</h3>
                <h2 className="price">3.05%</h2>
                <hr/>
                <div>
                    <div className="label">
                        Born On or After 1995 AD
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="buy">Learn More</Link>
                    <Link href="/" className="buy">Apply</Link>
                </div>
            </div>
        </div>
    );
}

export default AccountCard;