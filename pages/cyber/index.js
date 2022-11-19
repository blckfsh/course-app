import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import CyberComp from "../../components/cyber";
import { getCourses, getUserByEmail, getRedeemByUserId } from "../api/methods/actions";

export default function Cyber({ courses }) {
    const { status, data } = useSession();
    const router = useRouter();
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);

    const onSignOutHandler = async () => {
        await signOut();
    }

    const isEmailExisting = async () => {
        const action = await getUserByEmail(data.user.email);
        return action.data.data[0]._id.toString();
    }

    const isUserExisting = async () => {
        const id = await isEmailExisting();
        const callGetRedeemCode = await getRedeemByUserId(id);

        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        return callGetRedeemCode;
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") isUserExisting();
        } catch (error) {
            console.log(error);
        }
    }, [status]);


    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} />
                <CyberComp courses={courses} />
            </>
        )
    }

    return <div>loading</div>;
}

export async function getServerSideProps() {
    const action = await getCourses();
    const courses = await action.data.data[0];

    return {
        props: {
            courses: courses
        },
    }
}