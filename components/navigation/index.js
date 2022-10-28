import Link from "next/link";

export default function Navigation() {
    return(
        <div className="w-full p-4 border-b-2 border-cyan-400 bg-black text-white">
            <div className="flex flex-row space-between text-center">
                <div className="flex-1">
                    LOGO HERE
                </div>
                <div className="flex-1">
                   <Link href="/cyber">
                    <a className="text-white">CYBER RANGE</a>
                   </Link>
                </div>
                <div className="flex-1">
                    <Link href="/training">
                        <a className="text-white">TRAINING MATERIALS</a>
                   </Link>
                </div>
                <div className="flex-1">
                    <Link href="/redeem">
                        <a className="text-white">REDEEM ACCESS KEYS</a>
                   </Link>
                </div>
                <div className="flex-1">
                    <Link href="/digital">
                        <a className="text-white">DIGITAL CERTIFICATE</a>
                   </Link>
                </div>
            </div>
        </div>
    )
}