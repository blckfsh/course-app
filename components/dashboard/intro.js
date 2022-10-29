export default function Intro(props) {
    return (
        <div>
            <div className="flex mt-5">
                <div className="flex-1">
                    <div className="p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
                        <p>Welcome, {props.name}</p>
                    </div>
                </div>
            </div>                   
        </div>
    )
}