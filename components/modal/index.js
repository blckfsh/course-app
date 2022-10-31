import Modal from "react-modal";

export default function ModalPopup(props) {

    return (
        <div className="flex justify-center items-center">
            <Modal
                isOpen={props.isOpen}
                ariaHideApp={false}
                // onAfterOpen={props.onAfterOpen}
                onRequestClose={props.onRequestClose}
                className="modal rounded-lg"
                overlayClassName="overlay"
                contentLabel="Course App Modal"
            >
                <div className="flex-none p-4">
                    <p className="text-2xl font-bold">{props.modalContent.title}</p>
                    <p className="my-3">{props.modalContent.message}</p>
                    <div className="mt-5 flex justify-center">
                        <a onClick={props.onRequestClose} className="flex cursor-pointer w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                             Close
                        </a>
                    </div>                    
                </div>
            </Modal>
        </div>
    )
}