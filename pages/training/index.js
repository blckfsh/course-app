import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import CourseComp from "../../components/training/course";
import { getUserByEmail, getRedeemByUserId, getCourses } from "../api/methods/actions";

export default function Training({ courses }) {
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

    const gotoTraining = async (id) => {
        router.push(`/training/${id}`);
    }

    useEffect(() => {
        try {
          if (status === "unauthenticated") router.replace("/");
          if (status === "authenticated") {
            isUserExisting();
          }
        } catch (error) {
          console.log(error);
        }
      }, [status]);
    
    
      if (status === "authenticated") {
        return (
          <>
            <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} />
            <CourseComp courses={courses} gotoTraining={gotoTraining} />
          </>
        )
      }
    
      return <div>loading</div>;
}

export async function getServerSideProps() {
    const action = await getCourses();
    const courses = await action.data.data;
  
    return {
      props: {
        courses: courses
      },
    }
  }