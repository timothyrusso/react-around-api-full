import React from "react";
import Popup from "./Popup";
import Form from "./Form";

const PopupWithForm = ({ name, title, isOpen, onClose, buttonText, confirmationButtonClass, confirmationTitleClass, onSubmit, loadingText, isLoading, formValidity, onFormUpdate, children }) => {
  
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <Form name={`myForm${name}`} onSubmit={onSubmit} onFormUpdate={onFormUpdate}>
        <h2 className={`popup__title ${confirmationTitleClass}`}>{title}</h2>
        {children}
        <button type="submit" className={`submit-button ${confirmationButtonClass} popup__button ${!formValidity ? "submit-button_disabled" : ""}`} disabled={!formValidity} >{isLoading ? loadingText : buttonText}</button>
      </Form>
    </Popup>
  )
}

export default PopupWithForm;
