import Image from "next/image";
import GIBLLogo from "@/assets/images/global-ime-logo-svg.svg"

const Footer = () => {
    return (
        <footer className="py-6 mt-10 border-t border-gray-200">
            <div className="container mx-auto">
                <Image src={GIBLLogo} alt={'GIBL Logo'} width={300} loading="lazy" className='mx-auto'/>
            </div>
        </footer>
    );
};

export default Footer;