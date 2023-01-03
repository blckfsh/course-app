export default function CoursesComp(props) {
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto">
            <div className="flex flex-row items-center">
                <div className="flex-1">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th className="border py-2 text-xl">Course</th>
                                <th className="border py-2 text-xl">Code</th>
                                <th className="border py-2 text-xl">Code Validity</th>
                                <th className="border py-2 text-xl">Status</th>
                                <th className="border py-2 text-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.redeems ?
                                props.redeems.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="border py-5 text-lg">{item.title}</td>
                                        <td className="border py-5 text-lg">
                                            {
                                                item.isRedeemed == false ?
                                                "*******" : item.code
                                            }
                                        </td>
                                        <td className="border py-5 text-lg">{item.isRedeemed == true ? "Your code is valid" : "Not redeemed yet"}</td>
                                        <td className="border py-5 text-lg">{item.isExpired == true ? "Code is expired" : "Code is not expired"}</td>
                                        <td className="border py-5 text-lg">
                                            { 
                                                item.isRedeemed == false || item.isRedeemed == "" ?
                                                <a onClick={() => props.goToView(props.id, item.id)} className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800">
                                                    Redeem
                                                </a> : <tr>
                                                    <td colSpan={5} className="border py-5 text-lg">
                                                        Loading Contents...
                                                    </td>
                                                </tr>
                                            }                                            
                                        </td>
                                    </tr>
                                }) : <tr>
                                    <td colSpan={5} className="border py-5 text-lg">
                                        Loading Contents...
                                    </td>
                                </tr>
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}