import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import RedeemComp from "../../../components/redeem";
import { getUserByEmail, getRedeemByUserId, getCourses, getRedeemByUserIdAndCourseId } from "../../api/methods/actions";

export default function Redeem({ spCourses }) {
    const router = useRouter();
    const { status, data } = useSession();
    const [isPageReady, setIsPageReady] = useState(false);
    const [role, setRole] = useState();
    const [id, setId] = useState();

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

    // const getAllCourses = async () => {
    //     let temp = [];
    //     const action1 = await getCourses();

    //     if (action1.data.data.length > 0) {
    //         action1.data.data.map(async (item) => {
    //             const action2 = await getRedeemByUserIdAndCourseId(router.query.id, item._id);
    //             temp.push({
    //                 id: item._id,
    //                 title: item.title,
    //                 isRedeemed: action2.isRedeemed
    //             })
    //         })
    //     }
    //     setCourses(temp);
    // }

    const gotoModifyRedeemCode = (course) => {
        router.replace(`/redeem/${router.query.id}/update/${course}`);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                getRole(data.user.email);
                isEmailExisting();
                setIsPageReady(true); // for admin to see the management view
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (isPageReady === true) {
        return (
            <div>
                <Layout 
                    onSignOutHandler={onSignOutHandler} 
                    role={role}
                    id={id}
                />
                <RedeemComp spCourses={spCourses} gotoModifyRedeemCode={gotoModifyRedeemCode} />
            </div>
        )
    } else {
        return (
            <>
                <Layout 
                    onSignOutHandler={onSignOutHandler} 
                    role={role}
                    id={id}
                />
                <div className="flex flex-row justify-center text-3xl font-bold">Loading...</div>
            </>
        )
    }

}

export async function getServerSideProps(context) {
    let tempCourses = [{}];
    const action1 = await getCourses();

    if (action1.data.data.length > 0) {
        tempCourses.pop();
        for (let x = 0; x <= parseInt(action1.data.data.length) - 1; x++) {
            let action2 = await getRedeemByUserIdAndCourseId(context.params.id, action1.data.data[x]._id);
            if (action2.length > 0) {
                tempCourses.push({
                    id: action1.data.data[x]._id,
                    title: action1.data.data[x].title,
                    code: action2[0].code,
                    isRedeemed: action2[0].isRedeemed
                })
            } else {
                tempCourses.push({
                    id: action1.data.data[x]._id,
                    title: action1.data.data[x].title,
                    code: "",
                    isRedeemed: ""
                })
            }
        }
    }

    return {
        props: {
            spCourses: tempCourses,
        }
    }
}