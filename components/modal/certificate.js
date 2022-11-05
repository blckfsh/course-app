import Modal from "react-modal";

export default function ModalCertificatePopup(props) {
    return (
        <div className="flex justify-center items-center">
            <Modal
                isOpen={props.isOpen}
                ariaHideApp={false}
                // onAfterOpen={props.onAfterOpen}
                onRequestClose={props.onRequestClose}
                className="modalCert"
                overlayClassName="overlay"
                contentLabel="Course App Modal"
            >
                <div className="bgCustom">
                    <div className="flex-none p-4 text-white bg-slate-900 opacity-75">
                        <div className="flex flex-col justify-between items-center">
                            <div className="flex w-full mb-5">
                                <div className="flex-1"></div>
                                <div className="flex-1">
                                    <p className="text-3xl font-bold text-center">[LOGO HERE]</p>
                                </div>
                                <div className="flex-1 text-right">
                                    <p className="text-sm">Certification Number:</p>
                                    <p className="text-sm font-bold">{props.modalContent.id}</p>
                                </div>
                            </div>
                            <div className="my-5">
                                <p className="text-7xl font-bold">{props.modalContent.title}</p>
                            </div>
                            <div className="text-center">
                                <p className="mb-2">This is to acknowledge that</p>
                                <p className="text-xl font-bold mb-2">{props.modalContent.name}</p>
                                <p className="mb-2">has successfully completed all requirements and criteria for</p>
                                <p className="text-xl font-bold mb-2">{props.modalContent.cert_title}</p>
                                <p className="mb-2">certification through examination administered by EC-Council</p>
                            </div>
                            <div className="flex flex-row justify-around items-center text-sm w-full mt-5">
                                <div className="flex-1 text-center">
                                    <p>Issue Date: <strong>{props.modalContent.awardedOn}</strong></p>
                                </div>
                                <div className="flex-1 text-center">
                                    <p>Expiry Date: <strong>{props.modalContent.expiredOn}</strong></p>
                                </div>
                            </div>                        
                        </div>                                      
                    </div>                                    
                </div>
                <div className="bg-zinc-800 flex justify-center py-5">
                    <a onClick={() => props.onDownloadClick(props.modalContent.id)} className="flex w-1/3 cursor-pointer justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                        Download
                    </a>
                </div>
            </Modal>
        </div>
    )
}