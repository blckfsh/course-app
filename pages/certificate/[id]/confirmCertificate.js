import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByEmail, updateDigitalCertificate, getCertificateById } from "../../api/methods/actions";
import Layout from "../../../components/layout";
import Confirm from "../../../components/certificate/confirm";
import ModalPopup from "../../../components/modal";

export default function ConfirmCertificate({ certificate }) {
    let modalResponse = {};
    const { status, data } = useSession();
    const router = useRouter();
    const [id, setId] = useState("");
    const [certId, setCertId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [certLink, setCertLink] = useState("");
    const [awardedOn, setAwardedOn] = useState("");
    const [expiredOn, setExpiredOn] = useState("");
    // const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [role, setRole] = useState("");
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
        await router.replace("/");
        await signOut();
      }

    const getStudentDetailsByCertId = async (id) => {
        const action = await getCertificateById(id);
        
        if (action.data.data) {
            setName(action.data.data[0].name);
            setEmail(action.data.data[0].email);
        }
    }

    const updateDigitalCertificateById = async (id, certificate) => {
        const action = await updateDigitalCertificate(id, certificate);
        console.log(action);
        if (action.status == 201) {
            modalResponse = {
                title: "Confirm Certificate",
                message: "Certificate was successfully confirmed"
            }
        } else {
            modalResponse = {
                title: "Confirm Certificate",
                message: "Certificate was not confirmed"
            }
        }

        await setModalContent(modalResponse);
        await openModal();

        setTimeout(() => router.replace("/home"), 2000);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                // isUserExisting();
                getRole(data.user.email);  
                setCertId(router.query.id);   
                getStudentDetailsByCertId(router.query.id);           
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} role={role} id={id} email={data.user.email} />
                <Confirm
                    certId={certId}
                    name={name}
                    email={email} 
                    certLink={certLink}
                    awardedOn={awardedOn}
                    expiredOn={expiredOn}
                    setAwardedOn={setAwardedOn}
                    setExpiredOn={setExpiredOn}
                    setCertLink={setCertLink}
                    updateDigitalCertificateById={updateDigitalCertificateById}
                />
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