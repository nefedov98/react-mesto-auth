import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';

import {api} from '../utils/Api.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const [selectedCard, setIsSelectedCard ] = React.useState(null)

    const [currentUser, setIsCurrentUser ] = React.useState({});

    const [cards, setCards ] = React.useState([])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true); 
      }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true); 
      }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true); 
      }
    
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsSelectedCard(null)
    }

    function handleCardClick(card) {
        setIsSelectedCard(card)
    }

    function handleUpdateUser (userData) {
        api.setUserInfoApi(userData)
          .then((data) => {
            setIsCurrentUser(data)
            closeAllPopups()
          })
          .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userData) {
        console.log(userData)
        api.handleUserAvatar(userData)
          .then((data) => {
            console.log(data)
            setIsCurrentUser(data)
            closeAllPopups()
          })
          .catch((err) => console.log(err))
      }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
      
        api.like(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })

        .catch((err) => console.log(err))
    }   
    
    function handleCardDelete (card) {
        api.deleteCard(card._id)
          .then(() => {
            setCards(cards.filter((item) => item !== card))
          })
          .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(cardData) {
        api.creatNewCard(cardData)
          .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
          })
          .catch((err) => console.log(err))
    }

    // React.useEffect(() => {
    //     api.getUserInfoApi()
    //     .then((data) => {
            // setIsCurrentUser(data)
    //      })
    //     .catch((err) => console.log(err))
    // }, [])

    // React.useEffect(() => {
    //     api.getInitialCards()
    //     .then((data) => {
    //         setCards(data)
    //         console.log(data)

            
    //     })
    //     .catch((err) => console.log(err))
    // }, [])

    React.useEffect(() => {
        Promise.all([api.getUserInfoApi(), api.getInitialCards()])
            .then(([ userData, cards ]) => {
                setCards(cards)

                setIsCurrentUser(userData)

            })
            .catch((err) => console.log(err));
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header /> 
            <Main 
                onEditAvatar ={handleEditAvatarClick} 
                onEditProfile ={handleEditProfileClick} 
                onAddPlace ={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />
            <Footer /> 
            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups} 
                onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
