import Link from "next/link";
import moment from "moment";

export default function CertificateComp(props) {
    return (
        <div>
            <div className="flex w-3/4 mx-auto mt-5">
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Certificates</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Student Name</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Awarded On</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Expiring On</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Status</p>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-lg font-bold">Action</p>
                </div>
            </div>
            <div>
                {
                    props.certs ?
                    props.certs.map((cert, index) => {
                        return <div key={index} className="flex w-3/4 mx-auto mt-2 border-2 p-2">
                            <div className="flex-1 text-center">
                                <Link href={`/certificate/${cert._id}`}>
                                    <a className="text-lg text-blue-700 cursor-pointer">{cert.cert_title}</a>                                
                                </Link>                                
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-lg">{cert.name}</p>
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-lg">{moment(cert.awardedOn).format("MMM Do YY")}</p>
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-lg">{moment(cert.expiredOn).format("MMM Do YY")}</p>
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-lg">{cert.status}</p>
                            </div>
                            <div className="flex-1 text-center">
                                <a onClick={() => props.goToConfirmCertificate(cert._id)}>Confirm</a>
                            </div>
                        </div>
                    })
                    : ""
                }
            </div>
        </div>
    )
}