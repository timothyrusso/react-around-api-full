import { FC } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { Card } from "../../types/Card";

type DeleteConfirmPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
  deleteCard;
  isLoading;
  startLoading;
  formValidity;
};

const DeleteConfirmPopup: FC<DeleteConfirmPopupProps> = ({
  isOpen,
  onClose,
  card,
  deleteCard,
  isLoading,
  startLoading,
  formValidity,
}) => {
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
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
