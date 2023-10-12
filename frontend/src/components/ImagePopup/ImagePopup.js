import React from "react";
import Popup from "../Popup";

const ImagePopup = ({ card, onClose }) => {

  return (
    <Popup isOpen={card} name="preview" onClose={onClose} previewClass={true}>
      <img className="popup__preview-image" src={card ? card.link : ""} alt={card ? card.name : ""} />
      <figcaption className="popup__caption">{card ? card.name : ""}</figcaption>
    </Popup>
  )
}

export default ImagePopup;
