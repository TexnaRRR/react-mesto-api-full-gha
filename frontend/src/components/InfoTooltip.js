import React from 'react';
import success from "../images/accept.svg";
import fail from "../images/close.svg";

function InfoTooltip(props) {
  return(
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container tooltip">
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>
        <img src={props.tooltip.image ? success : fail} className="tooltip__image" alt={props.tooltip.message}/>
        <h3 className="popup__title">{props.tooltip.message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;