import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Layout from "../../../components/layout";
import CoursesComp from "../../../components/redeem/course";
import { getUserByEmail, getRedeemByUserIdAndCourseId, getRedeemByUserId, getCourses, getCourseById } from "../../api/methods/actions";

export default function RedeemCourses({courses, codes}) {
    const router = useRouter();
    const { status, data } = useSession();
    const [id, setId] = useState();
    const [role, setRole] = useState();
    const [redeems, setRedeems] = useState([]);    
    const [studentRedeems, setStudentRedeems] = useState([]);
    const [isPageReady, setIsPageReady] = useState(false);

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
        let tempCodes = [];

        setIsPageReady(false);
        courses.map(async (item) => {
            const cs = await getRedeemByUserIdAndCourseId(router.query.id, item._id);            
            if (cs.length > 0) {
                tempRedeems.push({
                    id: item._id,
                    redeem_id: cs[0]._id,
                    title: item.title,
                    code: cs[0].code,
                    isRedeemed: cs[0].isRedeemed,
                    isExpired: cs[0].isExpired,
                    dateCreated: cs[0].dateCreated
                })
            } else {
                tempRedeems.push({
                    id: item._id,
                    redeem_id: "",
                    title: item.title,
                    code: "",
                    isRedeemed: "",
                    isExpired: "",
                    dateCreated: ""
                })
            }

            setRedeems(tempRedeems);
        })

        codes.map(async (item) => {
            const cs = await getRedeemByUserIdAndCourseId(router.query.id, item.course_id);
            const courseTitle = await getCourseById(item.course_id);            
            if (cs.length > 0) {
                tempCodes.push({
                    id: item.course_id,
                    redeem_id: cs[0]._id,
                    title: courseTitle.data.data[0].title,
                    code: cs[0].code,
                    isRedeemed: cs[0].isRedeemed,
                    isExpired: cs[0].isExpired,
                    dateCreated: cs[0].dateCreated
                })
            } else {
                tempCodes.push({
                    id: item.course_id,
                    redeem_id: "",
                    title: courseTitle.data.data[0].title,
                    code: "",
                    isRedeemed: "",
                    isExpired: "",
                    dateCreated: ""
                })
            }

            setStudentRedeems(tempCodes);
        })

        setIsPageReady(true); // for admin to see the management view
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

    if (isPageReady === true) {
        return (
            <div>
                <Layout
                    onSignOutHandler={onSignOutHandler}
                    role={role}
                    id={id}
                />
                {
                    role === "admin" ?
                    <CoursesComp redeems={redeems} goToView={goToView} id={id} /> : ""
                }
                {
                    role === "student" ?
                    <CoursesComp redeems={studentRedeems} goToView={goToView} id={id} /> : ""
                }
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
    const courses = await getCourses();
    const codes = await getRedeemByUserId(context.params.id);

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
            courses: courses.data.data,
            codes
        }
    }
}