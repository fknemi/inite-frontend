import React, { useState, useEffect } from "react";

export const CustomModal = (props: any) => {
  const { handleSuccess, handleCancel, handleClose } = props;

  return (
    <div className="flex flex-col gap-3 absolute-center bg-slate-500 border-3 border-b-gray-500 w-80 h-52 items-center text-center rounded-xl">
      <span
        className="self-end mr-1 select-none cursor-pointer"
        onClick={() => {
          handleClose();
        }}
      >
        ❌
      </span>
      <div className="relative top-1/4">
        <h1 className="font-bold text-xl mb-5">Are You Sure</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              handleClose();
              handleSuccess();
            }}
            className="rounded-md text-black font-bold bg-green-400 text-lg w-20 shadow-md outline-none"
          >
            Yes
          </button>
          <button
            onClick={() => {
              handleClose();
              handleCancel();
            }}
            className="rounded-md text-black font-bold  bg-red-600 text-lg w-20 shadow-md outline-none"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

// export const useModal = (initialMode = false) => {
  
//   const toggle = () => setModalOpen(!modalOpen);
//   return [modalOpen, setModalOpen, toggle];
// };

export const useModal = (
  initialMode = false,
  initialSelected = null
) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const [selected, setSelected] = useState(initialSelected);
  const setModalState = (state: any) => {
    setModalOpen(state);
    if (state === false) {
      setSelected(null);
    }
  };
  return { modalOpen, setModalOpen, selected, setSelected, setModalState };
};

export default useModal;
