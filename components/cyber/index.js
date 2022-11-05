export default function CyberComp(props) {
    const { title, description } = props.courses
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
            <div className="flex w-3/4 mx-auto mt-5">
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Table of Contents</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Description</p>
                </div>
            </div>            
            <div>
                {
                    props.courses.labs ?
                    props.courses.labs.map((module, index) => {
                        
                        return <div key={index} className="flex w-3/4 mx-auto mt-2 border-2 p-2">
                            <div className="flex-1">
                                <a href={`${module.path}/${module.name}`} target="_blank" className="text-lg text-blue-700 cursor-pointer">{module.name}</a>                                
                            </div>
                            <div className="flex-1">
                                <p className="text-lg">{module.desc}</p>
                            </div>
                        </div>
                    }) : ""
                }
            </div>
            
            
        </div>
        
    )
}