import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Card as CardType } from "../../types/Card";

export type CardProps = {
    card: CardType;
    onCardClick: (card: CardType) => void;
    onCardLike: (card: CardType) => void;
    onCardDelete: (card: CardType) => void;
}

const Card = ({ card, onCardClick, onCardLike, onCardDelete }: CardProps) => {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = isOwn ? 'card__delete' : 'card__delete_hidden';
    const isLiked = card.likes && card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    const handleClick = () => {
        onCardClick(card)
    }

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    return (
        <li className="card">
            <button aria-label="Delete" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
            <div className="card__content">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button aria-label="Like" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like-counter">{card.likes && card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;
