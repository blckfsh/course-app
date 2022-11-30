import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import TrainingComp from "../../../components/training";
import { getCourseById, getUserByEmail, getRedeemByUserId  } from "../../api/methods/actions";

export default function Training({ courses }) {
  const { status, data } = useSession();
  const router = useRouter();
  const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
  const [role, setRole] = useState("");

  const getRole = async (email) => {
    const action = await getUserByEmail(email);
    setRole(action.data.data[0].role);
}

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

  const editTraining = (id, index) => {
    router.replace(`/training/${id}/${index}`);
}

  useEffect(() => {
    try {
      if (status === "unauthenticated") router.replace("/");
      if (status === "authenticated") {
        getRole(data.user.email);
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
        <TrainingComp courses={courses} role={role} editTraining={editTraining} />
      </>
    )
  }

  return <div>loading</div>;
}

export async function getServerSideProps(context) {
  const action = await getCourseById(context.params.id);
  const courses = await action.data.data[0];

  return {
    props: {
      courses: courses
    },
  }
}