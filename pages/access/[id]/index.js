import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
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

    const getCoursesWithRedeemedCodes = useCallback(async () => {
        let tempRedeems = [];
        let tempCodes = [];

        // setIsPageReady(false);
        // courses.map(async (item) => {
        //     const cs = await getRedeemByUserIdAndCourseId(router.query.id, item._id);            
        //     if (cs.length > 0) {
        //         tempRedeems.push({
        //             id: item._id,
        //             redeem_id: cs[0]._id,
        //             title: item.title,
        //             code: cs[0].code,
        //             isRedeemed: cs[0].isRedeemed,
        //             isExpired: cs[0].isExpired,
        //             dateCreated: cs[0].dateCreated
        //         })
        //     } else {
        //         tempRedeems.push({
        //             id: item._id,
        //             redeem_id: "",
        //             title: item.title,
        //             code: "",
        //             isRedeemed: "",
        //             isExpired: "",
        //             dateCreated: ""
        //         })
        //     }

        //     console.log("Fetching admin redeem codes");
        //     console.log(tempRedeems);
        //     // setRedeems(tempRedeems);
        // })

        // codes.map(async (item) => {
        //     const cs = await getRedeemByUserIdAndCourseId(router.query.id, item.course_id);
        //     const courseTitle = await getCourseById(item.course_id);            
        //     if (cs.length > 0) {
        //         tempCodes.push({
        //             id: item.course_id,
        //             redeem_id: cs[0]._id,
        //             title: courseTitle.data.data[0].title,
        //             code: cs[0].code,
        //             isRedeemed: cs[0].isRedeemed,
        //             isExpired: cs[0].isExpired,
        //             dateCreated: cs[0].dateCreated
        //         })
        //     } else {
        //         tempCodes.push({
        //             id: item.course_id,
        //             redeem_id: "",
        //             title: courseTitle.data.data[0].title,
        //             code: "",
        //             isRedeemed: "",
        //             isExpired: "",
        //             dateCreated: ""
        //         })
        //     }

        //     console.log("Fetching admin redeem codes");
        //     console.log(tempCodes);
        //     // setStudentRedeems(tempCodes);
        // })
    }, [])

    const goToView = (userId, id) => {
        router.push(`/access/${userId}/view/${id}`);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");       
            if (status === "authenticated") {
                setIsPageReady(false);
                getRole(data.user.email);     
                isEmailExisting();           
                // getCoursesWithRedeemedCodes();
                setId(router.query.id);
                console.log(role);
                console.log("Fetching codes from ssr...");
                console.log(codes);
                setIsPageReady(true); // for admin to see the management view
            }
        } catch (error) {
            console.log(error);
        }
    }, [status, role]);

    if (isPageReady === true) {
        return (
            <div>
                <Layout
                    onSignOutHandler={onSignOutHandler}
                    role={role}
                    id={id}
                    email={data.user.email}
                />
                {
                    role === "admin" ?
                    <CoursesComp redeems={courses} goToView={goToView} id={id} /> : ""
                }
                {
                    role === "student" ?
                    <CoursesComp redeems={codes} goToView={goToView} id={id} /> : ""
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
                    email={data.user.email}
                />
                <div className="flex flex-row justify-center text-3xl font-bold">Loading...</div>
            </>
        )
    }
    
}

export async function getServerSideProps(context) {
    let tempRedeems = [];
    let tempCodes = [];
    
    const courses = await getCourses();
    const codes = await getRedeemByUserId(context.params.id);

    // NOT SURE IF WE NEED THIS?
    // There is no link in admin portal that will lead to this
    if (courses) {
        for (let i = 0; i <= parseInt(courses.length) - 1; i++) {
            const cs = await getRedeemByUserIdAndCourseId(context.params.id, courses[i]._id);

            if (cs.length > 0) {
                tempRedeems.push({
                    id: courses[i]._id,
                    redeem_id: cs[0]._id,
                    title: courses[i].title,
                    code: cs[0].code,
                    isRedeemed: cs[0].isRedeemed,
                    isExpired: cs[0].isExpired,
                    dateCreated: cs[0].dateCreated
                })
            } else {
                tempRedeems.push({
                    id: courses[i]._id,
                    redeem_id: "",
                    title: courses[i].title,
                    code: "",
                    isRedeemed: "",
                    isExpired: "",
                    dateCreated: ""
                })
            }
        }
    }
    
    if (codes) {
        for (let i = 0; i <= parseInt(codes.length) - 1; i++) {
            const cs = await getRedeemByUserIdAndCourseId(context.params.id, codes[i].course_id);
            const courseTitle = await getCourseById(codes[i].course_id);            
            if (cs.length > 0) {
                tempCodes.push({
                    id: codes[i].course_id,
                    redeem_id: cs[0]._id,
                    title: courseTitle.data.data[0].title,                    
                    code: cs[0].code,
                    isRedeemed: cs[0].isRedeemed,
                    isExpired: cs[0].isExpired,
                    dateCreated: cs[0].dateCreated
                })
            } else {
                // NOT SURE IF WE NEED THIS
                // tempCodes.push({
                //     id: codes[i].course_id,
                //     redeem_id: "",
                //     // title: courseTitle.data.data[0].title,
                //     title: "Course Sample",
                //     code: "",
                //     isRedeemed: "",
                //     isExpired: "",
                //     dateCreated: ""
                // })
            }
        }
    }

    return {
        props: {
            courses: tempRedeems,
            codes: tempCodes
        }
    }
}