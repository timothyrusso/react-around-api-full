import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { register, authorize, checkToken } from "../utils/auth";

const App = () => {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(undefined)
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(undefined)
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [formValidity, setFormValidity] = useState(true)
  const [errorMessage, setErrorMessage] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  const history = useNavigate();

  const handleCardLike = (card) => {

    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus({ cardId: card._id, isLiked })
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCardDelete = (card) => {
    api.deleteCards({ cardId: card._id })
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setFormValidity(true)
    setErrorMessage({})
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setFormValidity(true)
    setErrorMessage({})
    setIsAddPlacePopupOpen(true)
  }

  const handleConfirmationClick = (card) => {
    setIsConfirmationPopupOpen(true)
    setSelectedDeleteCard(card)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setSelectedCard(undefined)
    setTooltipOpen(false)
  }

  const handleUpdateUser = (currentUser) => {
    api.saveProfileInfo({ name: currentUser.name, about: currentUser.about })
      .then((info) => {
        setCurrentUser(info.data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleUpdateAvatar = (currentUser) => {
    api.saveProfileImage({ avatar: currentUser.avatar })
      .then((info) => {
        setCurrentUser(info.data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleAddPlaceSubmit = (card) => {
    api.saveCards({ name: card.cardName, imageLink: card.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const startLoading = () => {
    setIsLoading(true)
  }

  const checkValidity = (evt) => {
    const name = evt.target.name;
    setErrorMessage({ ...errorMessage, [name]: evt.target.validationMessage });
  }

  const onFormUpdate = (data) => {
    data ? setFormValidity(true) : setFormValidity(false)
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history("/");
        } else {
          localStorage.removeItem("jwt")
        }
      })
        .catch((err) => console.log(err))
    }
  }

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setToggleMenu(false);
    localStorage.removeItem('jwt');
    history('/signin');
  }

  const handleRegisterSubmit = (password, email) => {
    register(password, email)
      .then((res) => {
        if (res.data._id) {
          console.log('res OK');
          setStatus("success");
          history('/signin');
        } else {
          console.log('Something went wrong.');
          setStatus("failed");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("failed");
      })
      .finally(() => {
        setTooltipOpen(true);
      })
  }

  const handleLoginSubmit = (password, email) => {
    if (!password || !email) {
      setStatus("failed");
      setTooltipOpen(true);
      return;
    }
    authorize(password, email)
      .then((data) => {
        if (data.token) {
          handleLogin();
          history('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("failed");
        setTooltipOpen(true);
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && loggedIn) {
      api.getProfileInfo()
        .then((info) => {
          setCurrentUser(info.data)
        })
        .catch((err) => {
          console.log(err);
        })
      api.getCards()
        .then((data) => {
          setCards(data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header loggedIn={loggedIn} handleLogout={handleLogout} userEmail={localStorage.email} toggleNav={toggleNav} toggleMenu={toggleMenu} />
        <Routes>
          <Route
            exact path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main onEditAvatarClick={handleEditAvatarClick} onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleConfirmationClick} />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLoginSubmit={handleLoginSubmit} />} />
          <Route path="/signup" element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} onFormUpdate={onFormUpdate} onInputUpdate={checkValidity} errorMessage={errorMessage} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} onFormUpdate={onFormUpdate} onInputUpdate={checkValidity} errorMessage={errorMessage} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} onFormUpdate={onFormUpdate} errorMessage={errorMessage} onInputUpdate={checkValidity} />
        <DeleteConfirmPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} card={selectedDeleteCard} deleteCard={handleCardDelete} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={tooltipOpen} onClose={closeAllPopups} status={status} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
