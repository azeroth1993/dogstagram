import React, { useState, useEffect, useLayoutEffect } from "react"
import { createPortal } from 'react-dom';

interface Modal {
  className?: string,
  title: string,
  children?: React.ReactNode,
  open: boolean,
  onClose?: () => void,
  wrapperId: string
}

const Modal: React.FunctionComponent<Modal> = ({ title, className, children, open = false, onClose, wrapperId }) => {

  const [isOpen, setIsOpen] = useState(open);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const createRoot = (id:string) => {
    const rootElement = document.createElement('div');
    rootElement.setAttribute("id", id);
    document.body.appendChild(rootElement);
    return rootElement;
  }

  useLayoutEffect(() => {
    let root = document.getElementById(wrapperId) as HTMLElement;
    let wrapperCreated = false;
    if (!root) {
      wrapperCreated = true;
      root = createRoot(wrapperId);
    }
    setRootElement(root);
    return () => {
      if (wrapperCreated && root.parentNode) {
        root.parentNode.removeChild(root);
      }
    }
  }, [wrapperId]);

  const closeModal = () => {
    setIsOpen(false);
    onClose && onClose();
  }

  const toggleModal = (open: boolean) => {
    open ? setIsOpen(true) : setIsOpen(false);
  }

  useEffect(() => {
    toggleModal(open);
    return () => {
      
    }
  }, [open])

  if (rootElement === null) return null;
  return createPortal (
    <div className={`justify-center fixed transition-all will-change-transform items-center top-0 bottom-0 left-0 right-0 w-screen h-screen mx-auto z-50 ${isOpen ? 'flex' : 'hidden'} ${className}`}>
      <div
        className={`absolute w-full h-full top-0 bottom-0 bg-black bg-opacity-60 z-50`}
        onClick={closeModal}
      ></div>
      <div className="block relative shadow-md max-w-3xl bg-white w-[90%] h-auto rounded-md z-50">
        <header className="flex justify-between items-center w-full border-b h-14 pl-4 pr-2 sm:h-16 sm:pl-6 sm:pr-3 select-none">
          <span className="text-xl font-bold capitalize">{title}</span>
          <svg className="w-14 h-14 p-3 lg:cursor-pointer" onClick={closeModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" /></svg>
        </header>
        <main className="">
          {children}
        </main>
      </div>
    </div>,
    rootElement
  )
}
export default Modal

