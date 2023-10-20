import React from "react";
import Popup from "../Popup/Popup";
import Form from "../Form/Form";

export type PopupWithFormProps = {
  name: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  confirmationButtonClass: string;
  confirmationTitleClass: string;
  onSubmit: (evt: { preventDefault: () => void; }) => void;
  loadingText: string;
  isLoading: boolean;
  formValidity: boolean;
  onFormUpdate?: (data: boolean) => void;
  children?: React.ReactNode;
};

const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  buttonText,
  confirmationButtonClass,
  confirmationTitleClass,
  onSubmit,
  loadingText,
  isLoading,
  formValidity,
  onFormUpdate,
  children,
}: PopupWithFormProps) => {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <Form
        name={`myForm${name}`}
        onSubmit={onSubmit}
        onFormUpdate={onFormUpdate}
      >
        <h2 className={`popup__title ${confirmationTitleClass}`}>{title}</h2>
        {children}
        <button
          type="submit"
          className={`submit-button ${confirmationButtonClass} popup__button ${
            !formValidity ? "submit-button_disabled" : ""
          }`}
          disabled={!formValidity}
        >
          {isLoading ? loadingText : buttonText}
        </button>
      </Form>
    </Popup>
  );
};

export default PopupWithForm;
