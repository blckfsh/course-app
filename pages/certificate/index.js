import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByEmail, getCourses, getCertificates, requestDigitalCertificate, getCertificateById } from "../api/methods/actions";
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
    const [certLink, setCertLink] = useState("");
    const [certStatus, setCertStatus] = useState("");
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
        console.log(action);
        setCerts(action);
    }

    const getCertUsingCourseId = async (id) => {
        const isRequested = await getCertificateById(id);
        if (isRequested.data.data.length > 0) {
            setCertStatus(isRequested.data.data[0].status);        
            setCertLink(isRequested.data.data[0].cert_link);
        }
    }

    const requestCertificate = async () => {
        const user = await getRole(data.user.email);

        let payload = {
            course_id: spCourses[0].id,
            name: user.firstname + " " + user.lastname,
            email: user.email,
            cert_title: `Digital Certificate - ${spCourses[0].title}`
        }
        
        const action = await requestDigitalCertificate(payload);
        if (action.status == 201) {
            setCertStatus("PENDING");
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
                getCertUsingCourseId(spCourses[0].id);
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
                    <CourseComp spCourses={spCourses} requestCertificate={requestCertificate} certStatus={certStatus} certLink={certLink} /> :
                    <CertificateComp certs={certs} goToConfirmCertificate={goToConfirmCertificate} />
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