export default function Redeem(props) {

    const onSubmitHandler = (code) => {        
        props.verifyRedeemCode(code);
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex-none m-5 lg:w-1/3 w-full">                
                <div className="flex-1 m-5">
                    <div className="p-4 bg-gray-200 border-2 border-gray-500 rounded-lg">
                        <p className="text-3xl font-bold">Redeem Access</p>
                        <p>Enter your training product access key. If you have multiple access keys, enter and redeem them one at a time.</p>
                        <div className="mt-5">
                            <input
                                type="text"
                                name="redeem"
                                placeholder="Redeem Code"
                                value={props.code}
                                onChange={(e) => props.setCode(e.target.value)}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                            />
                        </div>
                        <div className="mt-3">
                            <a 
                                onClick={() => onSubmitHandler(props.code)}
                                className="flex w-full cursor-pointer justify-center rounded-lg align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800"
                            >
                                Redeem Now
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                </div>
            </div>
        </div>
    )
}