import React, { useState, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Input from "../Input/Input";

export type EditProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (currentUser) => void;
  isLoading: boolean;
  startLoading: () => void;
  formValidity: boolean;
  onFormUpdate: (data: boolean) => void;
  errorMessage: {[name: string]: string};
  onInputUpdate: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading, startLoading, formValidity, onFormUpdate, onInputUpdate, errorMessage }: EditProfilePopupProps) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onInputUpdate(evt)
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onInputUpdate(evt)
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    startLoading()
    // Prevent the browser from navigating to the form address
    evt.preventDefault();

    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="edit" title="Edit profile" isOpen={isOpen} onClose={onClose} buttonText={"Save"} loadingText={"Saving.."} isLoading={isLoading} onSubmit={handleSubmit} formValidity={formValidity} onFormUpdate={onFormUpdate}>
      <Input type={"text"} idName={"name-input"} name={"name"} fieldName={"field_name"} placeholder={"Name"} minLength={"2"} maxLength={"40"} value={name} onChange={handleNameChange} errorMessage={errorMessage} />
      <Input type={"text"} idName={"aboutMe-input"} name={"aboutMe"} fieldName={"field_about-me"} placeholder={"Description"} minLength={"2"} maxLength={"200"} value={description} onChange={handleDescriptionChange} errorMessage={errorMessage} />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
