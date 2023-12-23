import React, { FC } from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import type { Card as Cardtype } from '../../types/Card';

export type MainProps = {
  onEditAvatarClick: () => void;
  onEditProfileClick: () => void;
  onAddPlaceClick: () => void;
  onCardClick: () => void;
  cards: Cardtype[];
  onCardLike: () => void;
  onCardDelete: () => void;
  editButtonText: () => void;
  addButtonText: () => void;
  children: React.ReactNode;
};

const Main: FC<MainProps> = ({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  editButtonText,
  addButtonText,
  children,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-wrapper" onClick={onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="Avatar of the page profile"
            className="profile__image"
          />
          <button
            aria-label="Edit"
            type="button"
            className="profile-image-button"
          ></button>
        </div>
        <div className="profile__wrapper">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            aria-label="Edit"
            type="button"
            className="edit-button"
            onClick={onEditProfileClick}
          >
            {editButtonText}
          </button>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button
          aria-label="Add"
          type="button"
          className="add-button"
          onClick={onAddPlaceClick}
        >
          {addButtonText}
        </button>
      </section>

      <section className="gallery">
        <ul className="cards-grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {children}
    </main>
  );
};

export default Main;
