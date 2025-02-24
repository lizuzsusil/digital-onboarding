import React from 'react';
import GIBLLogo from "@/assets/images/global-ime-logo-svg.svg";
import Image from "next/image";

function Header() {
    return (
        <header className="sticky">
            <div className="bg-gibl-gradient py-3">
                <div className="container mx-auto">
                    <div className="">
                        <Image src={GIBLLogo} alt={'GIBL Logo'} width={200} loading="lazy" className='bg-white p-2'/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;