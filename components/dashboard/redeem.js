export default function Redeem() {
    return (
        <div>
            <div className="mt-5 flex flex-row">
                <div className="flex-1">
                </div>
                <div className="flex-1">
                    <div className="p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
                        <p className="text-3xl font-bold">Redeem Access</p>
                        <p>Enter your training product access key. If you have multiple access keys, enter and redeem them one at a time.</p>
                        <div className="mt-5">
                            <input
                                type="text"
                                name="redeem"
                                placeholder="Redeem Code"
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                            />
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="flex w-full justify-center rounded-lg align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                Redeem Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}