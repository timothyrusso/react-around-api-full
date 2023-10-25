import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";
import type { Card } from "../../types/Card";

export type AddPlacePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddPlaceSubmit: (card: Card) => void;
  isLoading: boolean;
  startLoading: () => void;
  formValidity: boolean;
  onFormUpdate: (data: boolean) => void;
  errorMessage: {[name: string]: string} | {};
  onInputUpdate: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit, isLoading, startLoading, formValidity, onFormUpdate, errorMessage, onInputUpdate }: AddPlacePopupProps) => {

  const [cardName, setCardName] = useState('')
  const [link, setLink] = useState('')

  const handleNameCardChange = (evt) => {
    onInputUpdate(evt)
    setCardName(evt.target.value)
  }

  const handleLinkChange = (evt) => {
    onInputUpdate(evt)
    setLink(evt.target.value)
  }

  const handleSubmit = (evt) => {
    startLoading()
    evt.preventDefault()
    onAddPlaceSubmit({ cardName, link })
  }

  React.useEffect(() => {
    setCardName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm name="add" title="New place" isOpen={isOpen} onClose={onClose} buttonText={"Create"} loadingText={"Saving.."} isLoading={isLoading} onSubmit={handleSubmit} formValidity={formValidity} onFormUpdate={onFormUpdate}>
      <Input type={"text"} idName={"title-input"} name={"title"} fieldName={"field_title"} placeholder={"Title"} minLength={"2"} maxLength={"30"} value={cardName} onChange={handleNameCardChange} errorMessage={errorMessage} />
      <Input type={"url"} idName={"link-input"} name={"link"} fieldName={"field_link"} placeholder={"Image link"} value={link} onChange={handleLinkChange} errorMessage={errorMessage} />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
