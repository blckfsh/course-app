export default function CourseComp(props) {
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <div className="flex flex-row items-center">
                <div className="flex-1">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.spCourses ?
                                props.spCourses.map((course, index) => {
                                    return <tr key={index}>
                                        <td>{course.title}</td>
                                        <td>
                                            {
                                                props.certStatus == "PENDING" ?
                                                <a disabled={true} className="p-1 rounded-lg mx-2 text-white text-sm font-semibold bg-slate-700">
                                                    Requested
                                                </a> : course.status == "CONFIRMED" ?
                                                <a>View</a> :
                                                <a onClick={() => props.requestCertificate(course.id)} className="p-1 rounded-lg mx-2 text-white text-sm font-semibold bg-cyan-700 hover:bg-cyan-800">
                                                    Request
                                                </a>
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