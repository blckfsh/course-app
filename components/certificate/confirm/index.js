import moment from "moment";

export default function Confirm(props) {
    console.log(props.certLink);
    const onSubmitHandler = (e) => {
        e.preventDefault();

        let payload = {
            cert_link: props.certLink,
            awardedOn: moment(props.awardedOn).format(),
            expiredOn: moment(props.expiredOn).format(),
            status: "CONFIRMED"
        }

        // console.log(payload);
        props.updateDigitalCertificateById(props.certId, payload);
    }
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <div className="flex">
                <div className="flex-1">
                    <div className="flex flex-col">
                        <div className="flex-1 mb-5">
                            <p className="text-2xl font-bold">Confirm the Certificate</p>
                        </div>
                        <div>
                            <p>Student: {props.name}</p>
                            <p>Email: {props.email}</p>
                        </div>
                        <div className="flex-none mt-5 w-11/12">
                            <label>Certificate URL:</label>
                            <input 
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                type="text"
                                name="url"
                                id="url"
                                value={props.certLink}
                                onChange={(e) => props.setCertLink(e.target.value)}
                            />
                        </div>
                        <div className="flex-none mt-5 w-11/12">
                            <label>Awarded On:</label>
                            <input
                                type="date"
                                name="code"
                                id="code"
                                value={props.awardedOn}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                onChange={(e) => props.setAwardedOn(e.target.value)}
                            />
                        </div>
                        <div className="flex-none mt-5 w-11/12">
                            <label>Expired On:</label>
                            <input
                                type="date"
                                name="code"
                                id="code"
                                value={props.expiredOn}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                onChange={(e) => props.setExpiredOn(e.target.value)}
                            />
                        </div>                        
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col">
                        <div className="flex-none w-full">
                            <button
                                onClick={(e) => onSubmitHandler(e)}
                                className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800"
                            >
                                Confirm
                            </button>
                        </div>                        
                    </div>
                </div>
            </div>

        </div>
    )
}