import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout";
import Redeem from "../../../../components/redeem/redeem";
import ModalPopup from "../../../../components/modal";
import { getRedeemByUserIdAndCourseId, getUserByEmail, updateRedeemCode } from "../../../api/methods/actions";

export default function RedeemCourse() {
    let modalResponse = {};
    const router = useRouter();
    const { status, data } = useSession();
    const [id, setId] = useState("");
    const [role, setRole] = useState();
    const [code, setCode] = useState("");
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const openModal = async () => await setModalIsOpen(true);
    const closeModal = async () => await setModalIsOpen(false);
    const afterOpenModal = () => console.log("after opening the modal");

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await router.replace("/");
        await signOut();
      }

    const isEmailExisting = async () => {
        const action = await getUserByEmail(data.user.email);
        setId(action.data.data[0]._id.toString());
        return action.data.data[0]._id.toString();
      }

    const isUserExisting = async () => {
        const callGetRedeemCode = await getRedeemByUserIdAndCourseId(router.query.id, router.query.redeem);
        console.log(callGetRedeemCode);

        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        return callGetRedeemCode;
    }

    const verifyRedeemCode = async (code) => {
        const isExisting = await isUserExisting();
        
        if (isExisting.length > 0) {
            isExisting.map(async (item) => {
                let userId = item.user_id;
                let courseId = item.course_id;
                let correctCode = item.code;
                let isRedeemed = item.isRedeemed;
                let updateToRedeemed = {
                    isRedeemed: true
                }

                if (correctCode == code) {
                    if (isRedeemed == false) {
                        // send the modalResponse first to prevent no content on modal
                        modalResponse = {
                            title: "Redeem Code",
                            message: "You have now access with the course."
                        }

                        await updateRedeemCode(userId, courseId, updateToRedeemed);
                    } else {
                        modalResponse = {
                            title: "Redeem Code",
                            message: "Code has been redeemed."
                        }
                    }
                } else {
                    modalResponse = {
                        title: "Redeem Code",
                        message: "The code is not linked with your account."
                    }
                }
            })
            setModalContent(modalResponse);
            openModal();
            setTimeout(() => router.replace("/home"), 3000);
        }
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                getRole(data.user.email);
                isEmailExisting();
                isUserExisting();
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <div>
                <Layout
                    onSignOutHandler={onSignOutHandler}
                    role={role}
                    id={id}
                    email={data.user.email}
                />
                <Redeem 
                    code={code}
                    setCode={setCode}
                    verifyRedeemCode={verifyRedeemCode}
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
    
    return <div>loading</div>;
}