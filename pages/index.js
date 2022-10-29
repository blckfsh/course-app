import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../components/layout";
import Intro from "../components/dashboard/intro";
import Redeem from "../components/dashboard/redeem";
import Students from "../components/dashboard/students";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState("");

  /* ==================== ADMIN SECTION ==================== */
  const gotoCreateRedeemCode = (id) => {
    router.push(`/redeem/create/${id}`);
  }

  const getRole = async (email) => {
    const action = await axios.get(`/api/user/${email}`);

    setRole(action.data.data[0].role);
  }

  const getStudents = async () => {
    const action = await axios.get(`/api/user/role/student`);
    let tempStudents = [];

    if (action.data.data.length > 0) {
      action.data.data.map(async (res) => {
        let action2 = await axios.get(`/api/redeem/${res._id}`);
        if (action2 != []) {
          tempStudents.push({
            id: res._id,
            name: res.firstname + " " + res.lastname,
            email: res.email,
            code: "",
            isRedeemed: ""
          })
        } else {
          tempStudents.push({
            id: res._id,
            name: res.firstname + " " + res.lastname,
            email: res.email,
            code: action2.code,
            isRedeemed: action2.isRedeemed
          })
        }

      })
    }
    setStudents(tempStudents);
  }
  /* ==================== ADMIN SECTION ==================== */

  /* ==================== STUDENT SECTION ==================== */
  const isEmailExisting = async () => {
    const action = await axios.get(`/api/user/${data.user.email}`);
    return action.data.data[0]._id.toString();
  }

  const isUserExisting = async () => {
    const id = await isEmailExisting();
    const action = await axios.get(`/api/redeem/${id}`);

    return action;
  }

  const verifyRedeemCode = async (code) => {
    const isExisting = await isUserExisting();

    if (isExisting.data.data.length) {
      let userId = isExisting.data.data[0].user_id;
      let correctCode = isExisting.data.data[0].code;
      let isRedeemed = isExisting.data.data[0].isRedeemed;
      let updateToRedeemed = {
        isRedeemed: true
      }

      if (correctCode == code) {
        if (isRedeemed == false) await axios.patch(`/api/redeem/${userId}`, updateToRedeemed);
      } else {
        console.log("incorrect code");
      }
    }
  }
  /* ==================== STUDENT SECTION ==================== */

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
    if (status === "authenticated") {
      getRole(data.user.email);
      getStudents();
    }
  }, [status]);

  if (status === "authenticated")
    return (
      <div>
        <Layout />
        <Intro name={data.user.name.toString()} />
        {
          role == "student" ?
            <Redeem name={data.user.name.toString()} verifyRedeemCode={verifyRedeemCode} code={code} setCode={setCode} /> :
            <Students students={students} gotoCreateRedeemCode={gotoCreateRedeemCode} />
        }
      </div>
    );

  return <div>loading</div>;
}