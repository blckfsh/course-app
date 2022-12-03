export default function CoursesComp(props) {
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <div className="flex flex-row items-center">
                <div className="flex-1">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Code</th>
                                <th>Code Validity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.redeems ?
                                props.redeems.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>
                                            {
                                                item.isRedeemed == false ?
                                                "*******" : item.code
                                            }
                                        </td>
                                        <td>{item.isRedeemed == true ? "Your code is valid" : "Not redeemed yet"}</td>
                                        <td>{item.isExpired == true ? "Code is expired" : "Code is not expired"}</td>
                                        <td>
                                            { 
                                                item.isRedeemed == false || item.isRedeemed == "" ?
                                                <a onClick={() => props.goToView(props.id, item.id)} className="cursor-pointer p-1 rounded-lg mx-2 text-white text-sm font-semibold bg-cyan-700 hover:bg-cyan-800">
                                                    Redeem
                                                </a> : ""
                                            }                                            
                                        </td>
                                    </tr>
                                }) : ""
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}