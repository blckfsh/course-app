import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Layout from "../../../../../components/layout";
import Update from "../../../../../components/redeem/update";
import ModalPopup from "../../../../../components/modal";
import {
    getUserByEmail,
    getUserDetailsById,
    getAllStudents,
    generate,
    createRedeemCode,
    updateRedeemCode,
    getRedeemByUserIdAndCourseId
} from "../../../../api/methods/actions";

export default function UpdateRedeem({ spUser }) {
    let modalResponse = {};
    const { status, data } = useSession();
    const router = useRouter();
    const [role, setRole] = useState();
    const [id, setId] = useState();
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

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        if (action.data.data[0].role !== "admin") router.replace("/home");
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const isEmailExisting = async () => {
        const action = await getUserByEmail(data.user.email);
        setId(action.data.data[0]._id.toString());
        return action.data.data[0]._id.toString();
    }

    const isUserExisting = async () => {
        const action = await getRedeemByUserIdAndCourseId(router.query.id, router.query.course);
        const callGetRedeemCode = await getRedeemByUserIdAndCourseId(router.query.id, router.query.course);
        
        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        if (action.length > 0) isSetExpire(action[0].isExpired);
        return action;
    }

    const generateExpiryDate = async () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 1); // adding 1 month

        return today;
    }

    const generateCode = async () => {
        const expiry = await generateExpiryDate();
        const generatedCode = await generate();
        let newCode = {
            email,
            user_id: router.query.id,
            course_id: router.query.course,
            code: generatedCode,
            isRedeemed: false,
            isExpired: false,
            dateCreated: moment(expiry).format()
        }
        let updateCode = {
            email,
            code: generatedCode,
            isRedeemed: false,
            isExpired: false,
            dateCreated: moment(expiry).format()
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

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/");
        if (status === "authenticated") {
            getRole(data.user.email);
            isEmailExisting();
            setName(spUser[0].name);
            setEmail(spUser[0].email);
        }
    }, [status]);

    return (
        <div>
            <Layout 
                onSignOutHandler={onSignOutHandler} 
                isCodeRedeemed={isCodeRedeemed} 
                role={role}
                id={id}
                email={data.user.email}
            />
            <Update
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