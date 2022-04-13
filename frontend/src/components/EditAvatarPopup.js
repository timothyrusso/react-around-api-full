import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading, startLoading, formValidity, onFormUpdate, errorMessage, onInputUpdate }) => {

  const avatarRef = useRef()

  const handleSubmit = (evt) => {
    startLoading()
    evt.preventDefault()

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="profile-image" title="Change profile picture" isOpen={isOpen} onClose={onClose} buttonText={"Create"} loadingText={"Saving.."} isLoading={isLoading} onSubmit={handleSubmit} formValidity={formValidity} onFormUpdate={onFormUpdate}>
      <input type="url" id="image-link-input" name="link" className="popup__input popup__input_image_link" placeholder="Image link" ref={avatarRef} required onChange={onInputUpdate} />
      <span id="image-link-input-error" className="popup__input_type_error">{errorMessage["link"]}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
