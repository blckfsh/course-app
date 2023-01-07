import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { getUserByEmail, getCourses, getCertificates, requestDigitalCertificate, getCertificateById, getCertificateByIdAndUserEmail, getCourseById } from "../api/methods/actions";
import Layout from "../../components/layout";
import CourseComp from "../../components/certificate/course";
import CertificateComp from "../../components/certificate";
import ModalPopup from "../../components/modal";

export default function CertificateCourses({ spCourses }) {
    let modalResponse = {};
    const { status, data } = useSession();
    const router = useRouter();
    const [id, setId] = useState("");
    // const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [role, setRole] = useState("");
    const [studentCerts, setStudentCerts] = useState([]);
    const [certs, setCerts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const openModal = async () => await setModalIsOpen(true);
    const closeModal = async () => await setModalIsOpen(false);
    const afterOpenModal = () => console.log("after opening the modal");

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setId(action.data.data[0]._id.toString());
        setRole(action.data.data[0].role);

        return action.data.data[0];
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const getAllCertificates = async () => {
        const action = await getCertificates();
        setCerts(action);
    }

    const getCertUsingCourseId = useCallback(async (email) => {
        let tempCerts = [];
        if (spCourses) {
            spCourses.map(async (item) => {
                const isRequested = await getCertificateByIdAndUserEmail(email, item.id);
                if (isRequested.data.data.length > 0) {
                    tempCerts.push({
                        id: item.id,
                        title: item.title,
                        status: isRequested.data.data[0].status,
                        link: isRequested.data.data[0].cert_link
                    })
                } else {
                    tempCerts.push({
                        id: item.id,
                        title: item.title,
                        status: "NONE",
                        link: ""
                    })
                }
            })

            setStudentCerts(tempCerts);
        }
    }, [studentCerts])

    const requestCertificate = async (id) => {
        const user = await getRole(data.user.email);
        const course = await getCourseById(id);

        let payload = {
            course_id: course.data.data[0]._id,
            name: user.firstname + " " + user.lastname,
            email: user.email,
            cert_title: `${course.data.data[0].title} Certificate`
        }

        console.log(payload);
        
        const action = await requestDigitalCertificate(payload);
        if (action.status == 201) {
            // setCertStatus("PENDING");
            modalResponse = {
                title: "Request Certificate",
                message: "Certificate was successfully requested"
            }
        } else {
            modalResponse = {
                title: "Request Certificate",
                message: "Something went wrong"
            }
        }
        
        await setModalContent(modalResponse);
        await openModal();
    }

    const goToConfirmCertificate = async (id) => {
        router.push(`/certificate/${id}/confirmCertificate`);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                // isUserExisting();
                getRole(data.user.email);
                getAllCertificates();
                getCertUsingCourseId(data.user.email);
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} role={role} id={id} />
                {
                    role === "student" ?
                    <CourseComp studentCerts={studentCerts} requestCertificate={requestCertificate} /> : ""
                }
                {
                    role === "admin" ? 
                    <CertificateComp certs={certs} goToConfirmCertificate={goToConfirmCertificate} /> : ""
                }
                <ModalPopup
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    modalContent={modalContent}
                />
            </>
        )
    }

    return <div>loading</div>;
}

export async function getServerSideProps() {
    let tempCourses = [{}];
    const action1 = await getCourses();

    if (action1.data.data.length > 0) {
        tempCourses.pop();
        for (let x = 0; x <= parseInt(action1.data.data.length) - 1; x++) {
            tempCourses.push({
                id: action1.data.data[x]._id,
                title: action1.data.data[x].title
            })
        }        
    }
    
    return {
        props: {
            spCourses: tempCourses,
        }
    }
}