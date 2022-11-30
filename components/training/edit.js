import { useForm } from "react-hook-form";

export default function EditTrainingComp(props) {
    const { name, desc, path, setName, setDesc, setPath } = props;
    const { register, handleSubmit, trigger, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {        
        props.editTraining(props.id, props.counter, data);
    }
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex-1 mr-5">
                        <div className="flex flex-col">
                            <div className="flex-1">
                                <p className="text-2xl font-bold">Edit Training Details</p>
                            </div>
                            <div className="flex-1">
                                <label>Training Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={name}
                                    {...register("name", {
                                        required: "Name is required",
                                        maxLength: {
                                          value: 100,
                                          message: "Maximum of 100 characters allowed"
                                        }
                                      })}
                                      onKeyUp={(e) => {
                                        setName(e.target.value)
                                        trigger("name")
                                      }}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="desc"
                                    defaultValue={desc}
                                    {...register("desc", {
                                        required: "Description is required",
                                        maxLength: {
                                          value: 100,
                                          message: "Maximum of 100 characters allowed"
                                        }
                                      })}
                                      onKeyUp={(e) => {
                                        setDesc(e.target.value)
                                        trigger("desc")
                                      }}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label>Path:</label>
                                <input
                                    type="text"
                                    name="path"
                                    defaultValue={path}
                                    {...register("path", {
                                        required: "Path is required",
                                        maxLength: {
                                          value: 100,
                                          message: "Maximum of 100 characters allowed"
                                        }
                                      })}
                                      onKeyUp={(e) => {
                                        setPath(e.target.value)
                                        trigger("path")
                                      }}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 ml-5">
                        <div className="flex flex-col">
                            <div className="flex-1">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800"
                                >
                                    Update
                                </button>
                            </div>
                            <div className="flex-1 mt-5">
                                <button
                                    className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-gray-500 hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
