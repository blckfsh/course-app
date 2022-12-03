import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import CoursesComp from "../../../components/redeem/course";
import { getUserByEmail, getRedeemByUserIdAndCourseId, getCourseById, getCourses } from "../../api/methods/actions";

export default function RedeemCourses({courses}) {
    const router = useRouter();
    const { status, data } = useSession();
    const [id, setId] = useState();
    const [role, setRole] = useState();
    const [redeems, setRedeems] = useState([]);    

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
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

    const getCoursesWithRedeemedCodes = async () => {
        let tempRedeems = [];
        courses.map(async (item) => {
            const cs = await getRedeemByUserIdAndCourseId(router.query.id, item._id);
            if (cs.length > 0) {
                tempRedeems.push({
                    id: item._id,
                    redeem_id: cs[0]._id,
                    title: item.title,
                    code: cs[0].code,
                    isRedeemed: cs[0].isRedeemed,
                    isExpired: cs[0].isExpired
                })
            } else {
                tempRedeems.push({
                    id: item._id,
                    redeem_id: "",
                    title: item.title,
                    code: "",
                    isRedeemed: "",
                    isExpired: ""
                })
            }

            setRedeems(tempRedeems);
        })
    }

    const goToView = (userId, id) => {
        router.push(`/access/${userId}/view/${id}`);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");       
            if (status === "authenticated") {
                getRole(data.user.email);     
                isEmailExisting();           
                getCoursesWithRedeemedCodes();
                setId(router.query.id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);


    return (
        <div>
            <Layout
                onSignOutHandler={onSignOutHandler}
                role={role}
                id={id}
            />
            <CoursesComp redeems={redeems} goToView={goToView} id={id} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const courses = await getCourses();

    // if (courses.data.data.length > 0) {
    //     temp.pop();  
    //     courses.data.data.map(async (item) => {
    //         const code = await getRedeemByUserIdAndCourseId(context.params.id, item._id);
    //         temp.push({
    //             id: code._id,
    //             // title: item.title,
    //             // code: code.code,
    //             // isRedeemed: code.isRedeemed,
    //             // isExpired: code.isExpired
    //         })
    //     })
    // }

    return {
        props: {
            courses: courses.data.data
        }
    }
}