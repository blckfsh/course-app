import { useState } from "react";
import Login from "../components/login";
import ModalPopup from "../components/modal";

export default function SignIn() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = async () => await setModalIsOpen(true);
  const closeModal = async () => await setModalIsOpen(false);
  const afterOpenModal = () => console.log("after opening the modal");

  const errorMessage = async () => {
    let modalResponse = {
      title: "User Signin",
      message: "Wrong Username or Password."
    }

    setModalContent(modalResponse);
    openModal();
  }

  return (
    <div>
      <Login  errorMessage={errorMessage} />
      < ModalPopup
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        modalContent={modalContent}
      />
    </div>
  )
}
