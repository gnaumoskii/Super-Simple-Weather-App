import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import XIcon from "@/public/icons/x.svg";

type ModalProps = {
    ModalContent: React.JSX.Element;
    closeModal: () => void;
};

const Modal = ({ ModalContent, closeModal }: ModalProps) => {
    const closeModalHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (event.target != event.currentTarget) {
            return;
        }
        closeModal();
    };

    return createPortal(
        <motion.div
            className="!fixed !top-0 !left-0 h-screen w-screen bg-opacity-60 bg-slate-950 z-10 flex justify-center items-center"
            onClick={closeModalHandler}
            data-test="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative w-full md:max-w-[560px] flex justify-center items-center flex-grow h-full md:h-[800px] bg-slate-800 rounded-none md:rounded-3xl p-5 overflow-y-auto"
                data-test="modal"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ ease: "backInOut", type: "spring", duration: 0.7, bounce: 0.5 }}
            >
                <motion.button
                    className="absolute top-0 left-0  m-3"
                    onClick={closeModal}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", ease: "backInOut", delay: 0.1 }}
                >
                    <XIcon className="block md:hidden opacity-75" />
                </motion.button>
                {ModalContent}
            </motion.div>
        </motion.div>,
        document.getElementById("portal")!
    );
};

export default Modal;
