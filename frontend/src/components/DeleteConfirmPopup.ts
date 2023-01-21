import React from "react";
import PopupWithForm from "./PopupWithForm";

type DeleteConfirmPopupProps = {
  isOpen;
  onClose;
  card;
  deleteCard;
  isLoading;
  startLoading;
  formValidity;
};

const DeleteConfirmPopup = ({
  isOpen,
  onClose,
  card,
  deleteCard,
  isLoading,
  startLoading,
  formValidity,
}: DeleteConfirmPopupProps) => {
  const handleSubmit = (evt) => {
    startLoading();
    evt.preventDefault();
    deleteCard(card);
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Are you sure?"
      confirmationButtonClass={"submit-button_type_delete-card"}
      confirmationTitleClass={"popup__title_type_delete-card"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Yes"}
      loadingText={"Deleting.."}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      formValidity={formValidity}
    />
  );
};

export default DeleteConfirmPopup;
