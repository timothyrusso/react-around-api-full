import React from "react";
import Popup from "../Popup/Popup";
import successImage from "../images/success.svg"
import failedImage from "../images/failed.svg"

export type InfoTooltipProps = {
    isOpen: boolean;
    onClose: () => void;
    status: string;
}

const InfoTooltip = ({ isOpen, onClose, status }: InfoTooltipProps) => {

    return (
        <Popup isOpen={isOpen} onClose={onClose} infoTooltip={true}>
            <div className="info-tooltip" >{
                status === "success" ?
                    <div className="info-tooltip__wrapper">
                        <img src={successImage} alt="Success icon" className="info-tooltip__icon"></img>
                        <p className="info-tooltip__message">Success! You have now been registered.</p>
                    </div>
                    :
                    <div className="info-tooltip__wrapper">
                        <img src={failedImage} alt="Failed icon" className="info-tooltip__icon"></img>
                        <p className="info-tooltip__message">Oops, something went wrong! Please try again.</p>
                    </div>
            }</div>
        </Popup>
    )
}

export default InfoTooltip;