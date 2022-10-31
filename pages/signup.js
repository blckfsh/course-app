import { useState } from "react";
import { useRouter } from "next/router";
import Register from "../components/register";
import ModalPopup from "../components/modal";
import {
    getUserCodeByEmail,
    generate,
    updateVerificationCode,
    createNewVerificationCode,
    getVerificationCode,
    getUserByEmail,
    createUser
} from "./api/methods/actions";

export default function Signup() {
    let modalResponse = {};
    const router = useRouter();
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailLegit, setIsEmailLegit] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    
    const openModal = async () => await setModalIsOpen(true);
    const closeModal = async () => await setModalIsOpen(false);
    const afterOpenModal = () => console.log("after opening the modal");

    const receiveVerificationCode = async (email) => {
        const isCodeForUserExists = await getUserCodeByEmail(email);
        const generatedCode = await generate();
        let updatedCode = {
            email,
            code: generatedCode,
            isVerified: false
        }
        let newCode = {
            email,
            code: generatedCode
        }

        if (isCodeForUserExists.length > 0) {
            const callUpdateCode = await updateVerificationCode(email, updatedCode);

            if (callUpdateCode.status == 201) {
                modalResponse = {
                    title: "Sent Verification",
                    message: "Check your email for verification code."
                }
            }
        } else {
            const callCreateCode = await createNewVerificationCode(email, newCode);
            if (callCreateCode.status == 201) {
                modalResponse = {
                    title: "Sent Verification",
                    message: "Check your email for verification code."
                }
            }
        }
        setIsEmailLegit(true);
        setModalContent(modalResponse);
        openModal();
    }

    const verifyCode = async (value) => {
        const isCodeExisting = await getVerificationCode(value);

        if (isCodeExisting.data.content.length > 0) {
            const emailAddress = isCodeExisting.data.content[0].email;
            const { code, isVerified } = isCodeExisting.data.content[0];

            if (isVerified == false) {
                if (emailAddress == email && code == value) {
                    let updatedCode = { isVerified: true }
                    setIsVerified(true);

                    let callUpdateCode = await updateVerificationCode(email, updatedCode);
                    if (callUpdateCode.status == 201) {
                        modalResponse = {
                            title: "Code Verification",
                            message: "The verification was successful."
                        }
                        setIsVerified(true);                                                
                    }
                }
            }
        } else {
            modalResponse = {
                title: "Code Verification",
                message: "Incorrect Code"
            }
        }
        setModalContent(modalResponse);
        openModal();
    }

    const registerUser = async (user) => {
        const isUserExisting = await getUserByEmail(user.email);

        if (isUserExisting.data.data.length < 1) {
            const action = await createUser(user);
            console.log(action);
            if (action.status == 201) {
                modalResponse = {
                    title: "User Registration",
                    message: "Your registration is successful"
                }
                setModalContent(modalResponse);
                openModal();
                setTimeout(() => {
                    router.replace("/");
                }, 3000);
            } else {
                modalResponse = {
                    title: "User Registration",
                    message: "Oops. The registration failed."
                }
            }
        } else {
            modalResponse = {
                title: "User Registration",
                message: "The account has already registered."
            }
        }
        await setModalContent(modalResponse);
        await openModal();
    }

    return (
        <>
            <Register
                email={email}
                setEmail={setEmail}
                code={code}
                isEmailLegit={isEmailLegit}
                isVerified={isVerified}
                setCode={setCode}
                registerUser={registerUser}
                receiveVerificationCode={receiveVerificationCode}
                verifyCode={verifyCode}
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