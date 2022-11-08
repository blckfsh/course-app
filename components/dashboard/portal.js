import Link from "next/link";

export default function Portal() {

    return (
        <>
            <div className="mt-5 w-4/5 mx-auto flex flex-row text-white">
                <div className="flex-1 p-5">
                    <Link href="training">
                        <a className="border-2 rounded-lg bg-gray-500 flex justify-center items-center h-44">
                            <h3 className="text-2xl font-bold">TRAINING MATERIALS</h3>
                        </a>
                    </Link>
                    
                </div>
                <div className="flex-1 p-5">
                    <Link href="cyber">
                        <a className="border-2 rounded-lg bg-gray-500 flex justify-center items-center h-44">
                            <h3 className="text-2xl font-bold">VIRTUAL CYBER LABS</h3>
                        </a>
                    </Link>
                    
                </div>
            </div>
            <div className="mt-5 w-4/5 mx-auto flex flex-col justify-center items-center">
                <p className="mb-5 text-2xl font-bol">DO YOU HAVE ANY CONCERNS?</p>
                <Link href="/">
                    <a className="flex w-64 justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">Help Center</a>
                </Link>
            </div>
        </>
        
    )
}