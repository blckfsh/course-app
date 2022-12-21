export default function RedeemComp(props) {
    console.log(props.spCourses)
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto">
            <div className="flex flex-row items-center">
                <div className="flex-1">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th className="border py-2 text-xl">Course</th>
                                <th className="border py-2 text-xl">Code</th>
                                <th className="border py-2 text-xl">Is Redeemed</th>
                                <th className="border py-2 text-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.spCourses ?
                                props.spCourses.map((course, index) => {
                                    return <tr key={index}>
                                        <td className="border py-5 text-lg">{course.title}</td>
                                        <td className="border py-5 text-lg">{course.code}</td>
                                        <td className="border py-5 text-lg">{course.isRedeemed == true ? "Yes" : "No"}</td>
                                        <td className="border py-5 text-lg">
                                            <a onClick={() => props.gotoModifyRedeemCode(course.id)} className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800">
                                                    Modify Code
                                                </a>                                        
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