export default function TrainingComp() {
    return (
        <div>
            <div className="bg-zinc-700">
                <div className="flex flex-col w-3/4 mx-auto">
                    <div className="flex-1 mt-5 mb-3">
                        <p className="text-2xl text-white font-bold">Course Title</p>
                    </div>
                    <div className="flex-1 mt-2 mb-5">
                        <p className="text-xl text-white font-semibold">Course Description</p>
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
            <div className="flex w-3/4 mx-auto mt-2 border-2 p-2">
                <div className="flex-1">
                    <p className="text-lg">PPT 1</p>
                </div>
                <div className="flex-1">
                    <p className="text-lg">Description for PPT 1</p>
                </div>
            </div>
            <div className="flex w-3/4 mx-auto mt-2 border-2 p-2">
                <div className="flex-1">
                    <p className="text-lg">PPT 2</p>
                </div>
                <div className="flex-1">
                    <p className="text-lg">Description for PPT 2</p>
                </div>
            </div>
            <div className="flex w-3/4 mx-auto mt-2 border-2 p-2">
                <div className="flex-1">
                    <p className="text-lg">PPT 3</p>
                </div>
                <div className="flex-1">
                    <p className="text-lg">Description for PPT 3</p>
                </div>
            </div>
        </div>
        
    )
}