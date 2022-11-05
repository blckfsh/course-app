import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import CyberComp from "../../components/cyber";
import { getCourses } from "../api/methods/actions";

export default function Cyber({ courses }) {
    const { status } = useSession();
    const router = useRouter();

    const onSignOutHandler = async () => {
        await signOut();
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");

        } catch (error) {
            console.log(error);
        }
    }, [status]);


    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} />
                <CyberComp courses={courses} />
            </>
        )
    }

    return <div>loading</div>;
}

export async function getStaticProps() {
    const action = await getCourses();
    const courses = await action.data.data[0];

    return {
        props: {
            courses: courses
        },
    }
}