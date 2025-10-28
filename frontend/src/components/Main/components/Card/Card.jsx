import { useState, useContext } from "react";
import {IMAGES} from '../../../../utils/constants.jsx';
import { Popup } from '../../../Popup/Popup.jsx';
import { RemoveCard } from "../../../Popup/RemoveCard/RemoveCard.jsx";
import  CurrentUserContext  from '../../../../contexts/CurrentUserContext.js';
export function Card({ card = {}, onDelete, onCardClick, onLike }) {
    //const { card, onDelete, onCardClick, onLike } = props;
    const { name = "", link = "", likes = [] } = card;
    const [popup, setPopup] = useState(null);
    const deleteCard = { title: "Eliminar tarjeta?", children: <RemoveCard onConfirm={handleDelete} /> };
    const currentUser = useContext(CurrentUserContext);
    const isLiked = card.isLiked || (card.likes || []).some(user => user?._id === currentUser?._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button-active' : ''}`;

    function handleLike() {
      onLike(card);
      
    }
    function handleOpenPopup(popup) {
    setPopup(popup);
    }
    function handleDelete() {
      onDelete();
      setPopup(null);
      
    }
    return (
    <div className="card__container">
      <div className="card__header">
        <img 
        className="card__image" 
        src={link} 
        alt={name} 
        onClick={onCardClick}
        />
        <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => handleOpenPopup(deleteCard)}
        >
            <img src={IMAGES.deleteButton} alt="Eliminar" />
        </button>
        <div className="card__footer">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLike}
        />
            
      </div>
      </div>
      {popup && (
                <Popup onClose={() => setPopup(null)} title={popup.title}>
                    {popup.children}
                </Popup>
            )}
    </div>
  );
}