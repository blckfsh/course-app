export default function TrainingComp(props) {
    const { title, description } = props.courses;
    return (
        <div>
            <div className="bg-zinc-700">
                <div className="flex flex-col w-3/4 mx-auto">
                    <div className="flex-1 mt-5 mb-3">
                        <p className="text-2xl text-white font-bold">{title}</p>
                    </div>
                    <div className="flex-1 mt-2 mb-5">
                        <p className="text-xl text-white font-semibold">{description}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-3/4 mx-auto mt-5 pt-4">
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            <th className="border py-2 text-xl">Table of Contents</th>
                            <th className="border py-2 text-xl">Description</th>
                            {
                                props.role == "admin" ?
                                    <th>Action</th> : ""
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.courses.mods ?
                                props.courses.mods.map((module, index) => {

                                    return <tr key={index}>
                                        <td className="border py-5 text-lg">
                                            <a href={`${module.path}/${module.name}`} target="_blank" rel="noreferrer" className="text-lg text-blue-700 cursor-pointer">{module.name}</a>
                                        </td>
                                        <td className="border py-5 text-lg">{module.desc}</td>
                                        {
                                            props.role == "admin" ?
                                                <td className="border py-5 text-lg">
                                                    <a onClick={() => props.editTraining(props.courses._id, index)} className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800">Edit</a>
                                                </td> : ""
                                        }
                                    </tr>
                                }) : ""
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}