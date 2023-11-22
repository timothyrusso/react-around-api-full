import Popup from "../Popup/Popup";
import type { Card } from "../../types/Card";

export type ImagePopupProps = {
  card: Card | undefined;
  onClose: () => void;
}

const ImagePopup = ({ card, onClose }: ImagePopupProps) => {

  return (
    <Popup isOpen={card} name="preview" onClose={onClose} previewClass={true}>
      <img className="popup__preview-image" src={card ? card.link : ""} alt={card ? card.name : ""} />
      <figcaption className="popup__caption">{card ? card.name : ""}</figcaption>
    </Popup>
  )
}

export default ImagePopup;
