"use client"

import Image from "next/image";

type ModalInfoProps = {
    modalTitle: string;
    modalIcon: string;
    modalDescription: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ModalComponent = ({ modalTitle, modalIcon, modalDescription, isOpen, onClose, onConfirm }: ModalInfoProps) => {

    if (!isOpen) return null;

    return (
        <div className="flex flex-col justify-center items-center z-50 gap-4 shadow-md fixed inset-0 bg-black/30 p-4">
            <div className="flex flex-col gap-2 justify-center items-center bg-white p-6 rounded-lg w-[90%] max-w-sm">
                <div className="flex justify-center items-center w-20 h-20 p-4 bg-red-200 rounded-full">
                    <Image
                        src={modalIcon}
                        alt="icon"
                        width={80}
                        height={80}
                    />

                </div>
                <h2>{modalTitle}</h2>
                <div>
                    {modalDescription}
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={onClose} className="px-6 py-2 text-md bg-slate-100 hover:bg-slate-50 border-2 border-cyan-400 rounded-md shadow-md">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 text-md bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md">Yes</button>
                </div>
            </div>
        </div>

    );
};

export default ModalComponent;