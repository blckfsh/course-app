import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByEmail, getCourses } from "../api/methods/actions";
import Layout from "../../components/layout";
import CourseComp from "../../components/cyber/course";

export default function CyberCourses({ spCourses }) {
    const { status, data } = useSession();
    const router = useRouter();
    const [id, setId] = useState("");
    // const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [role, setRole] = useState("");
    const [courses, setCourses] = useState([]);

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setId(action.data.data[0]._id.toString());
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const goToCyberLab = (id) => {
        router.push(`/cyber/${id}`);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                // isUserExisting();
                getRole(data.user.email);
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} role={role} id={id} />
                <CourseComp spCourses={spCourses} goToCyberLab={goToCyberLab} />
            </>
        )
    }

    return <div>loading</div>;
}

export async function getServerSideProps() {
    let tempCourses = [{}];
    const action1 = await getCourses();

    if (action1.data.data.length > 0) {
        tempCourses.pop();
        for (let x = 0; x <= parseInt(action1.data.data.length) - 1; x++) {
            tempCourses.push({
                id: action1.data.data[x]._id,
                title: action1.data.data[x].title
            })
        }        
    }
    
    return {
        props: {
            spCourses: tempCourses,
        }
    }
}