export default function Students(props) {
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Redeem Code</th>
                        <th>Is Redeemed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.students ?
                        props.students.map((student, index) => {
                            return <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.code}</td>
                                <td>{student.isRedeemed}</td>
                                <td>
                                    <a
                                        onClick={() => props.gotoCreateRedeemCode(student.id)}
                                        className="cursor-pointer p-1 rounded-lg mx-2 text-white text-sm font-semibold bg-cyan-700 hover:bg-cyan-800"
                                    >
                                        Create Code
                                    </a>
                                </td>
                            </tr>
                        }) : "Loading..."
                    }
                </tbody>
            </table>

        </div>
    )
}