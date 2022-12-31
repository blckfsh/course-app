import Link from "next/link";
import moment from "moment";

export default function CertificateComp(props) {
    return (
        <div className="flex w-3/4 mx-auto mt-5">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th className="border py-2 text-xl">Certificates</th>
                        <th className="border py-2 text-xl">Student Name</th>
                        <th className="border py-2 text-xl">Awarded On</th>
                        <th className="border py-2 text-xl">Expiring On</th>
                        <th className="border py-2 text-xl">Status</th>
                        <th className="border py-2 text-xl">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.certs ?
                            props.certs.map((cert, index) => {
                                return <tr key={index}>
                                    <td className="border py-5 text-lg">{cert.cert_title}</td>
                                    <td className="border py-5 text-lg">{cert.name}</td>
                                    <td className="border py-5 text-lg">{moment(cert.awardedOn).format("MMM Do YY")}</td>
                                    <td className="border py-5 text-lg">{moment(cert.expiredOn).format("MMM Do YY")}</td>
                                    <td className="border py-5 text-lg">{cert.status}</td>
                                    <td className="border py-5 text-lg">
                                        <a
                                            className="cursor-pointer p-2 mx-2 text-white text-lg font-semibold bg-cyan-700 hover:bg-cyan-800"
                                            onClick={() => props.goToConfirmCertificate(cert._id)}
                                        >
                                            Confirm
                                        </a>
                                    </td>
                                </tr>
                            })
                            : ""
                    }
                </tbody>
            </table>
        </div>
    )
}