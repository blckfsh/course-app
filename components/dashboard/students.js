export default function Students(props) {
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th className="border py-2 text-xl">Name</th>
                        <th className="border py-2 text-xl">Email Address</th>
                        <th className="border py-2 text-xl">Redeem Code</th>
                        <th className="border py-2 text-xl">Is Redeemed</th>
                        <th className="border py-2 text-xl">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.students ?
                        props.students.map((student, index) => {
                            return <tr key={index}>
                                <td className="border py-5 text-lg">{student.name}</td>
                                <td className="border py-5 text-lg">{student.email}</td>
                                <td className="border py-5 text-lg">{student.code}</td>
                                <td className="border py-5 text-lg">{student.isRedeemed}</td>
                                <td className="border py-5 text-lg">
                                    <a
                                        onClick={() => props.gotoRedeemCode(student.id)}
                                        className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800"
                                    >
                                        View
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