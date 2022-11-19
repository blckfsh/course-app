import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Intro from "../components/dashboard/intro";
import Redeem from "../components/dashboard/redeem";
import Portal from "../components/dashboard/portal";
import Students from "../components/dashboard/students";
import ModalPopup from "../components/modal";
import { getUserByEmail, getAllStudents, getRedeemByUserId, updateRedeemCode } from "./api/methods/actions";

export default function Home({ spStudents }) {
  let modalResponse = {};
  const { status, data } = useSession();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [students, setStudents] = useState([]);
  const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = async () => await setModalIsOpen(true);
  const closeModal = async () => await setModalIsOpen(false);
  const afterOpenModal = () => console.log("after opening the modal");

  /* ==================== ADMIN SECTION ==================== */
  const gotoCreateRedeemCode = (id) => {
    router.push(`/redeem/create/${id}`);
  }

  const getRole = async (email) => {
    const action = await getUserByEmail(email);
    setRole(action.data.data[0].role);
  }
  /* ==================== ADMIN SECTION ==================== */

  /* ==================== STUDENT SECTION ==================== */
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

  const verifyRedeemCode = async (code) => {
    const isExisting = await isUserExisting();

    if (isExisting.length) {
      let userId = isExisting[0].user_id;
      let correctCode = isExisting[0].code;
      let isRedeemed = isExisting[0].isRedeemed;
      let updateToRedeemed = {
        isRedeemed: true
      }

      if (correctCode == code) {
        if (isRedeemed == false) {
          await updateRedeemCode(userId, updateToRedeemed);
          await setIsCodeRedeemed(true);

          modalResponse = {
            title: "Redeem Code",
            message: "You have now access with the course."
          }
        }
      } else {
        modalResponse = {
          title: "Redeem Code",
          message: "Incorrect Code."
        }
      }
    } else {
      modalResponse = {
        title: "Redeem Code",
        message: "The code is not linked with your account."
      }
    }
    setModalContent(modalResponse);
    openModal();
  }
  /* ==================== STUDENT SECTION ==================== */

  const onSignOutHandler = async () => {
    await signOut();
  }

  useEffect(() => {
    try {
      if (status === "unauthenticated") router.replace("/");
      if (status === "authenticated") {
        getRole(data.user.email);
        setStudents(spStudents);
        isUserExisting();
      }
    } catch(error) {
      console.log(error);
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div>
        <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} />
        <Intro name={data.user.name.toString()} />
        {
          role == "student" ?
            isCodeRedeemed == true ? 
            <Portal /> :
            <Redeem name={data.user.name.toString()} verifyRedeemCode={verifyRedeemCode} code={code} setCode={setCode} /> :
            <Students students={students} gotoCreateRedeemCode={gotoCreateRedeemCode} />
        }
        <ModalPopup
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          modalContent={modalContent}
        />
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
      let callGetRedeemByUserId = await getRedeemByUserId(callGetAllStudents[x].user_id);
      if (callGetRedeemByUserId.length < 1) {
        tempStudents.push({
          id: callGetAllStudents[x]._id,
          name: callGetAllStudents[x].firstname + " " + callGetAllStudents[x].lastname,
          email: callGetAllStudents[x].email,
          code: "",
          isRedeemed: ""
        })
      } else {
        tempStudents.push({
          id: callGetAllStudents[x]._id,
          name: callGetAllStudents[x].firstname + " " + res.lastname,
          email: callGetAllStudents[x].email,
          code: callGetRedeemByUserId.code,
          isRedeemed: callGetRedeemByUserId.isRedeemed
        })
      }
    }
  }

  return {
    props: {
      spStudents: tempStudents,
    }
  }
}