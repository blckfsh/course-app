import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import moment from "moment";
import axios from "axios";
import { getCourseById, getCertificateById, getCertificates } from "../../api/methods/actions";


export default function PrintCertificate({ certificates }) {
    const { status } = useSession();
    const router = useRouter();
    const ref = useRef(null);

    

    const onPrintCertificate = useCallback(async (id) => {
        if (ref.current === null) {
            return
        }


        await toPng(ref.current, { cacheBust: true, })
            .then(async (dataUrl) => {
                const link = document.createElement('a');
                // link.download = `${title}-${name}.png`;
                link.href = dataUrl;
                // link.click();
                // console.log(dataUrl);

                const newPrint = {
                    course_id: id,
                    uri: dataUrl
                }

                const addPrint = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/api/print`, newPrint);

                if (addPrint.status == 201) {
                    const generatePDF = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/api/print/${id}`);

                    if (generatePDF.status == 201) {

                        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URI}/api/print/${id}`);
                        // router.replace(generatePDF.data.dest);
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");            
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="h-screen w-1/2 mx-auto">
            <div>
                <div ref={ref}>
                    <div className="bgCustom flex flex-col justify-center">
                        <div className="flex-none p-4 text-white h-full bg-slate-900 opacity-75">
                            <div className="flex flex-col justify-between items-center">
                                <div className="flex w-full mb-5">
                                    <div className="flex-1"></div>
                                    <div className="flex-1">
                                        <p className="text-3xl font-bold text-center">[LOGO HERE]</p>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <p className="text-sm">Certification Number:</p>
                                        <p className="text-sm font-bold">{certificates[0].id}</p>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <p className="text-7xl font-bold">{certificates[0].title}</p>
                                </div>
                                <div className="text-center">
                                    <p className="mb-2">This is to acknowledge that</p>
                                    <p className="text-xl font-bold mb-2">{certificates[0].name}</p>
                                    <p className="mb-2">has successfully completed all requirements and criteria for</p>
                                    <p className="text-xl font-bold mb-2">{certificates[0].cert_title}</p>
                                    <p className="mb-2">certification through examination administered by EC-Council</p>
                                </div>
                                <div className="flex flex-row justify-around items-center text-sm w-full mt-5">
                                    <div className="flex-1 text-center">
                                        <p>Issue Date: <strong>{certificates[0].awardedOn}</strong></p>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p>Expiry Date: <strong>{certificates[0].expiredOn}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <a onClick={() => onPrintCertificate(certificates[0].id)} className="flex w-44 mr-5 px-5 cursor-pointer justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                        Download
                    </a>
                    <Link href="/home">
                        <a className="flex w-44 px-5 cursor-pointer justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                            Go Back
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// export async function getStaticPaths() {
//     const course = await getCertificates();

//     return {
//         fallback: false,
//         paths: course.map(course => ({
//             params: { id: course._id.toString() },
//         })),
//     }
// }

export async function getServerSideProps(context) {
    let tempCertificate = [];
    const certificate = await getCertificateById(context.params.id);
    const { _id, course_id, name, cert_title, awardedOn, expiredOn } = certificate.data.data[0];
    const course = await getCourseById(course_id);

    tempCertificate.push({
        id: _id,
        title: course.data.data[0].title,
        name,
        cert_title,
        awardedOn: moment(awardedOn).format("MMM Do YY"),
        expiredOn: moment(expiredOn).format("MMM Do YY")
    })

    return {
        props: {
            certificates: tempCertificate
        },
    }
}