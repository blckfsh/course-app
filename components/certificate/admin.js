import Link from "next/link";
import moment from "moment";

export default function AdminCertificates(props) {
    return (
        <div className="mt-5 p-4 w-4/5 mx-auto bg-gray-200 border-2 border-gray-500 rounded-lg">
            <div className="flex flex-row items-center">
                <div className="flex-1">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th>Date Given</th>
                                <th>Expiry Date</th>
                                <th>Title</th>
                                <th>Student Name</th>
                                <th>Cert Num</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.certificates ?
                                props.certificates.map((cert, index) => {
                                    return <tr key={index}>
                                        <td>{moment(cert.awardedOn).format("MMM Do YY")}</td>
                                        <td>{moment(cert.expiredOn).format("MMM Do YY")}</td>
                                        <td>{cert.cert_title}</td>
                                        <td>{cert.name}</td>
                                        <td>{cert._id}</td>                                        
                                    </tr>
                                }) : ""
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}