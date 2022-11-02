import { useState } from "react";
import { useRouter } from "next/router";
import ForgotPassword from "../components/forgot";
import ModalPopup from "../components/modal";
import {
    getVerificationCode,
    generate,
    createNewVerificationCode,
    updateVerificationCode,
    getUserByEmail,
    updateUserByEmail
} from "./api/methods/actions";

export default function Forgot() {
    let modalResponse = {};
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isEmailLegit, setIsEmailLegit] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const openModal = async () => await setModalIsOpen(true);
    const closeModal = async () => await setModalIsOpen(false);
    const afterOpenModal = () => console.log("after opening the modal");

    const receiveVerificationCode = async (value) => {
        const isCodeForUserExists = await getVerificationCode(value);
        const generatedCode = await generate();
        let updatedCode = {
            email: value,
            code: generatedCode,
            isVerified: false
        }
        let newCode = {
            email: value,
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
                    let updatedCode = {
                        isVerified: true
                    }

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

    const updatePassword = async (user) => {
        const isUserExisting = await getUserByEmail(user.email);

        if (isUserExisting.data.data.length > 0) {
            const action = await updateUserByEmail(user.email, user)
            if (action.status == 201) {
                modalResponse = {
                    title: "Reset Password",
                    message: "Reset Password is successful"
                }
                setModalContent(modalResponse);
                openModal();
                setTimeout(() => {
                    router.replace("/");
                }, 3000);
            } else {
                modalResponse = {
                    title: "Reset Password",
                    message: "Oops. The rest password failed."
                }
            }
        } else {
            modalResponse = {
                title: "Reset Password",
                message: "Oops. Something went wrong"
            }
        }
        await setModalContent(modalResponse);
        await openModal();
    }

    return (
        <div>
            <ForgotPassword
                isEmailLegit={isEmailLegit}
                email={email}
                setEmail={setEmail}
                code={code}
                setCode={setCode}
                receiveVerificationCode={receiveVerificationCode}
                updatePassword={updatePassword}
                verifyCode={verifyCode}
                isVerified={isVerified}
            />
            <ModalPopup
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                modalContent={modalContent}
            />
        </div>
    )
}
