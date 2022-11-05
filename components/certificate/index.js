import moment from "moment";

export default function CertificateComp(props) {
    return (
        <div>
            <div className="bg-zinc-700">
                <div className="flex flex-col w-3/4 mx-auto">
                    <div className="flex-1 mt-5 mb-3">
                        <p className="text-2xl text-white font-bold">{props.name}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-3/4 mx-auto mt-5">
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Certificates</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Awareded On</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Expiring On</p>
                </div>
            </div>
            <div>
                {
                    props.certs ?
                    props.certs.map((cert, index) => {
                        return <div key={index} className="flex w-3/4 mx-auto mt-2 border-2 p-2">
                            <div className="flex-1 text-center">
                                <p className="text-lg text-blue-700 cursor-pointer">{cert.cert_title}</p>                                
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-lg">{moment(cert.awardedOn).format("MMM Do YY")}</p>
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-lg">{moment(cert.expiredOn).format("MMM Do YY")}</p>
                            </div>
                        </div>
                    })
                    : ""
                }
            </div>
        </div>
    )
}