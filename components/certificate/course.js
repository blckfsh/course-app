import Link from "next/link";

export default function CourseComp(props) {    
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto">
            <div className="flex flex-row items-center">
                <div className="flex-1">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th className="border py-2 text-xl">Course</th>
                                <th className="border py-2 text-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.studentCerts ?
                                props.studentCerts.map((course, index) => {
                                    return <tr key={index}>
                                        <td className="border py-5 text-lg">{course.title}</td>
                                        <td className="border py-5 text-lg">
                                            {
                                                course.status === "NONE" ?
                                                <a onClick={() => props.requestCertificate(course.id)} className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800">
                                                    Request
                                                </a> : course.status === "PENDING" ?
                                                <a disabled={true} className="p-2 mx-2 text-white text-lg font-semibold bg-slate-700">
                                                    Requested
                                                </a> : course.status === "CONFIRMED" ?
                                                <a 
                                                    href={course.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800">
                                                    View
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