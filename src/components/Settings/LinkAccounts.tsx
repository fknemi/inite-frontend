import React, { useEffect } from "react";
import { CustomModal, useModal } from "../../hooks/useModal";
import { InstagramLink } from "../SocialButtons/LoginButtons";



const LinkAccounts = () => {
  const { modalOpen, selected, setSelected, setModalState } = useModal();
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <div>
      <h1 className="font-bold text-lg">LinkAccounts</h1>

      <button
        onClick={() => {
          setModalState(true);
        }}
      >
        UseModal get data lol
      </button>
      {modalOpen ? (
        <CustomModal
          title="User Detail"
          isActive={modalOpen}
          handleClose={() => {
            setModalState(false);
          }}
          handleSuccess={() => {
            setSelected(true as any);
          }}
          handleCancel={() => {
            setSelected(false as any);
          }}
        />
      ) : null}

      <div className="mt-10 ml-5 border-8 w-80">
        <InstagramLink/>
        
      </div>
    </div>
  );
};

export default LinkAccounts;
