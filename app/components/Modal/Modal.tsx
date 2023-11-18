import React from 'react'
import { motion } from "framer-motion";
import { createPortal } from 'react-dom';


type ModalProps = {
    ModalContent: React.JSX.Element;
    closeModal: () => void;
}

const Modal = ({ModalContent, closeModal}:ModalProps) => {
    // TODO: Add general modal animation
  const closeModalHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
   event.stopPropagation();
    if (event.target != event.currentTarget) {
        return;
    }
    closeModal();
  }

  return createPortal(
    <motion.div className="!fixed !top-0 !left-0 h-screen w-screen bg-opacity-60 bg-slate-950 z-10 flex justify-center items-center" onClick={closeModalHandler}
    initial={{opacity: 0,}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
        <motion.div className="w-[560px] h-[800px] bg-slate-800 rounded-3xl p-5 "
        initial={{y:30, scale: 0.9}}
        animate={{y: 0, scale: 1}}
        transition={{ease:"backInOut", type:"spring", duration: 0.7, bounce: 0.5}}
        >
            {ModalContent}
        </motion.div>
    </motion.div>,
    document.getElementById("portal")!
  )
}

export default Modal