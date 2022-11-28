import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layout";
import Create from "../../../../../components/redeem/create";
import ModalPopup from "../../../../../components/modal";
import {
    getUserDetailsById,
    getAllStudents,
    generate,
    createRedeemCode,
    updateRedeemCode,
    getRedeemByUserIdAndCourseId
} from "../../../../api/methods/actions";

export default function CreateRedeem({ spUser }) {
    let modalResponse = {};
    const { status, data } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [redeemCode, setRedeemCode] = useState(" ");
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [isExpire, isSetExpire] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const openModal = async () => await setModalIsOpen(true);
    const closeModal = async () => await setModalIsOpen(false);
    const afterOpenModal = () => console.log("after opening the modal");

    const isUserExisting = async () => {
        const action = await getRedeemByUserIdAndCourseId(router.query.id, router.query.course);
        const callGetRedeemCode = await getRedeemByUserIdAndCourseId(router.query.id, router.query.course);
        
        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        if (action.length > 0) isSetExpire(action[0].isExpired);
        return action;
    }

    const generateCode = async () => {
        const generatedCode = await generate();
        let newCode = {
            user_id: router.query.id,
            course_id: router.query.course,
            code: generatedCode
        }
        let updateCode = {
            code: generatedCode,
            isRedeemed: false,
            isExpired: false
        }
        setRedeemCode(generatedCode);

        const isExisting = await isUserExisting();

        if (isExisting.length > 0) {
            const callUpdateRedeem = await updateRedeemCode(router.query.id, router.query.course, updateCode)
            if (callUpdateRedeem.status == 201) {
                modalResponse = {
                    title: "Redeem Code",
                    message: "Updated Successfully"
                }
            }
        } else {
            const callCreateRedeem = await createRedeemCode(newCode);
            if (callCreateRedeem.status == 201) {
                modalResponse = {
                    title: "Redeem Code",
                    message: "Created Successfully"
                }
            }
        }
        await isUserExisting();
        await setModalContent(modalResponse);
        await openModal();
    }

    const disableCode = async () => {
        const isExisting = await isUserExisting();

        if (isExisting.length > 0) {
            const updateToExpired = {
                isExpired: !isExisting[0].isExpired
            }

            const callUpdateRedeem = await updateRedeemCode(router.query.id, router.query.course, updateToExpired);
            if (callUpdateRedeem.status == 201) {
                modalResponse = {
                    title: "Redeem Code",
                    message: "Redeem code was set to expired."
                }
            } else {
                modalResponse = {
                    title: "Redeem Code",
                    message: "Redeem code was set to expired failed."
                }
            }
            await isUserExisting();
        } else {
            modalResponse = {
                title: "Redeem Code",
                message: "The code is not associated to your account."
            }
        }

        setModalContent(modalResponse);
        openModal();
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/");
        if (status === "authenticated") {
            setName(spUser[0].name);
            setEmail(spUser[0].email);
        }
    }, [status]);

    return (
        <div>
            <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} />
            <Create
                name={name}
                email={email}
                redeemCode={redeemCode}
                generateCode={generateCode}
                disableCode={disableCode}
                isExpire={isExpire}
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

// export async function getStaticPaths() {
//     const data = await getAllStudents();

//     return {
//         fallback: false,
//         paths: data.map(student => ({
//             params: { id: student._id.toString() },
//         })),
//     }
// }

export async function getServerSideProps(context) {
    let tempUser = [];
    const uid = context.params.id;
    const user = await getUserDetailsById(uid);
    const { firstname, lastname, email } = user;

    tempUser.push({ name: firstname + " " + lastname, email });
    return {
        props: {
            spUser: tempUser
        }
    }
}