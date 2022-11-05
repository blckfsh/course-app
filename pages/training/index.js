import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import TrainingComp from "../../components/training";
import { getCourses } from "../api/methods/actions";

export default function Training({ courses }) {
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
        <TrainingComp courses={courses} />
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