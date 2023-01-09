import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import TrainingComp from "../../../components/training";
import { getCourseById, getUserByEmail, getRedeemByUserIdAndCourseId } from "../../api/methods/actions";

export default function Training({ courses }) {
  const { status, data } = useSession();
  const router = useRouter();
  const [id, setId] = useState("");
  const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
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
    setId(action.data.data[0]._id.toString());
    return action.data.data[0]._id.toString();
  }

  const isUserExisting = async () => {
    const id = await isEmailExisting();
    const callGetRedeemCode = await getRedeemByUserIdAndCourseId(id, router.query.id);

    setIsPageReady(false);
    if (callGetRedeemCode.length > 0) {
      setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);      
    }
    setIsPageReady(true); // for admin to see the management view
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
        console.log("Fetching thru training...")
        console.log(courses);
      }
    } catch (error) {
      console.log(error);
    }
  }, [status]);


  if (isPageReady == true) {
    return (
      <>
        <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} role={role} id={id} email={data.user.email} />
        {
          role === "admin" ?
            <TrainingComp courses={courses} role={role} editTraining={editTraining} /> : ""
        }
        {
          role === "student" && isCodeRedeemed == true ?
            <TrainingComp courses={courses} role={role} editTraining={editTraining} /> :
            role === "student" && isCodeRedeemed == false ?
              <div className="flex flex-col w-3/4 mx-auto text-center">
                <div className="flex-1 p-5">
                  <p className="text-2xl font-bold">You do not have an access to this course. Please call your admin</p>
                </div>
              </div> : ""
        }
      </>
    )
  } else {
    return (
        <>
            <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} role={role} id={id} email={data.user.email} /> 
            <div className="flex flex-row justify-center text-3xl font-bold">Loading...</div>
        </>
    )
  }
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