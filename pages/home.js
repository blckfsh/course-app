import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Intro from "../components/dashboard/intro";
import Portal from "../components/dashboard/portal";
import Students from "../components/dashboard/students";
import { getUserByEmail, getAllStudents, getRedeemByUserId } from "./api/methods/actions";

export default function Home({ spStudents }) {
  const { status, data } = useSession();
  const router = useRouter();
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [students, setStudents] = useState([]);
  const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);

  /* ==================== ADMIN SECTION ==================== */
  const gotoRedeemCode = (id) => {
    router.push(`/redeem/${id}`);
  }

  const getRole = async (email) => {
    const action = await getUserByEmail(email);
    setRole(action.data.data[0].role);
  }
  /* ==================== ADMIN SECTION ==================== */

  /* ==================== STUDENT SECTION ==================== */
  const isEmailExisting = async () => {
    const action = await getUserByEmail(data.user.email);
    setId(action.data.data[0]._id.toString());
    return action.data.data[0]._id.toString();
  }

  const isUserExisting = async () => {
    const id = await isEmailExisting();;
    const callGetRedeemCode = await getRedeemByUserId(id);

    if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
    return callGetRedeemCode;
  }
  /* ==================== STUDENT SECTION ==================== */

  const onSignOutHandler = async () => {
    await router.replace("/");
    await signOut();
  }

  useEffect(() => {
    try {
      if (status === "unauthenticated") router.replace("/");
      if (status === "authenticated") {
        getRole(data.user.email);
        setStudents(spStudents);
        isUserExisting();
        console.log(data.user.email);
      }
    } catch (error) {
      console.log(error);
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div>
        <Layout onSignOutHandler={onSignOutHandler} role={role} id={id} email={data.user.email} />
        <Intro name={data.user.name.toString()} />
        {
          role == "student" ?
          isCodeRedeemed == true ?
          <Portal /> : 
          <p className="text-center mt-5">Checking your access keys. If the page is not loaded after 5 minutes. Contact your admin</p> : ""
        }     
        {
          role == "admin" ? 
          <Students students={students} gotoRedeemCode={gotoRedeemCode} /> : ""
        }   
      </div>
    );
  }

  return <div>loading</div>;
}

export async function getServerSideProps() {
  let tempStudents = [];
  const callGetAllStudents = await getAllStudents();

  if (callGetAllStudents.length > 0) {
    tempStudents.pop();

    // NOTE: we use for loop because map function do not work on getInitialProps()
    for (let x = 0; x <= callGetAllStudents.length - 1; x++) {
      // let callGetRedeemByUserId = await getRedeemByUserId(callGetAllStudents[x].user_id);
      // if (callGetRedeemByUserId.length < 1) {
      //   tempStudents.push({
      //     id: callGetAllStudents[x]._id,
      //     name: callGetAllStudents[x].firstname + " " + callGetAllStudents[x].lastname,
      //     email: callGetAllStudents[x].email,
      //     code: "",
      //     isRedeemed: ""
      //   })
      // } else {
      //   tempStudents.push({
      //     id: callGetAllStudents[x]._id,
      //     name: callGetAllStudents[x].firstname + " " + res.lastname,
      //     email: callGetAllStudents[x].email,
      //     code: callGetRedeemByUserId.code,
      //     isRedeemed: callGetRedeemByUserId.isRedeemed
      //   })
      // }
      // codes above we dont need

      tempStudents.push({
        id: callGetAllStudents[x]._id,
        name: callGetAllStudents[x].firstname + " " + callGetAllStudents[x].lastname,
        email: callGetAllStudents[x].email,
        code: "",
        isRedeemed: ""
      })
    }
  }

  return {
    props: {
      spStudents: tempStudents,
    }
  }
}