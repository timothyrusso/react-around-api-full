import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export type EditAvatarPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (currentUser) => void;
  isLoading: boolean;
  startLoading: () => void;
  formValidity: boolean;
  onFormUpdate: (data: boolean) => void;
  errorMessage: {[name: string]: string} | {};
  onInputUpdate: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading, startLoading, formValidity, onFormUpdate, errorMessage, onInputUpdate }: EditAvatarPopupProps) => {

  const avatarRef = useRef(null)

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
