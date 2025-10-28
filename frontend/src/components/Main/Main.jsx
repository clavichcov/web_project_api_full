import React, { useEffect, useState, useContext } from 'react';
import  Api  from '../../utils/Api.js';
import {IMAGES} from '../../utils/constants.jsx';
import { Popup } from '../Popup/Popup.jsx';
import { NewCard } from '../Popup/NewCard/NewCard.jsx';
import { EditProfile } from '../Popup/EditProfile/EditProfile.jsx';
import { EditAvatar } from '../Popup/EditAvatar/EditAvatar.jsx';
import { ImagePopup } from '../Popup/ImagePopup/ImagePopup.jsx';
import { Card } from '../Main/components/Card/Card.jsx';
import  CurrentUserContext  from '../../contexts/CurrentUserContext.js';
import { setToken, getToken} from "../../utils/token";

export function Main() {
    const [popup, setPopup] = useState(null);
    const [cards, setCards] = useState([]);
    const [avatar, setAvatar] = useState(IMAGES.profileAvatar);
    const newCardPopup = { title: "Nuevo lugar", children: <NewCard onAddCard={handleAddCard} /> };
    const editProfilePopup = { title: "Editar perfil", children: <EditProfile onEditProfile={handleUpdateUser}/> };
    const editAvatarPopup = { title: "Editar imagen de perfil", children: <EditAvatar onEditAvatar={handleEditAvatar}/> };
    const [selectedCard, setSelectedCard] = useState(null);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const jwt = getToken();
    const apiAcces = new Api({
              baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
              
              headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`, 
                    
              }
            });
    
    useEffect(() =>{
        
        const loadCards = async () => {
            try {
                const cardsData = await apiAcces.getInitialCards();
                setCards(cardsData);
            } catch (error) {
                console.error('Error al cargar las cards:', error);
                
            }
        };
        
        loadCards();
    },[]);
    function handleAddCard(newCard) {
        apiAcces.addCard(newCard.name, newCard.link)
            .then(addedCard => {
                setCards([addedCard, ...cards]);
                handleClosePopup();
            })
            .catch(error => console.error('Error al añadir card:', error));
    }
    function handleUpdateUser(userData) {
        
    apiAcces.updateUserInfo(userData.name, userData.about)
    
        .then(updatedUser => {
            setCurrentUser(prevUser => ({
                ...prevUser, 
                name: updatedUser.name,
                about: updatedUser.about
            }));
            handleClosePopup();
        })
        .catch(error => console.error('Error al actualizar usuario:', error));
}
    function handleOpenPopup(popup) {
    setPopup(popup);
    }
    function handleClosePopup() {
    setPopup(null);
    }
    function handleEditAvatar(avatarData) {
        apiAcces.updateUserAvatar(avatarData.link)
            .then(updatedUser => {
            setCurrentUser(prevUser => ({
                ...prevUser,
                avatar: updatedUser.avatar
            }));
            handleClosePopup();
        })
        .catch(error => console.error('Error al editar avatar:', error));
    }
    function handleDeleteCard(cardId) {
        apiAcces.deleteCard(cardId)
        .then(() => {
            setCards(cards.filter(card => card._id !== cardId));
        })
        .catch(error => console.error('Error al eliminar card:', error));
    }
    function handleCardClick(card) {
        setSelectedCard(card);
        setPopup({
            children: <ImagePopup name={card.name} link={card.link} />
        });
    }

    async function handleCardLike(card) {
    try {
        const newCard = await (card.isLiked 
            ? apiAcces.dislikeCard(card._id) 
            : apiAcces.likeCard(card._id));
        
        
        setCards(cards.map(c => c._id === card._id 
            ? { ...newCard, likes: newCard.likes || card.likes || [] } 
            : c));
    } catch (error) {
        console.error("Error al actualizar like:", error);
    }
}

    return (
        <main className="content">
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__avatar-container">
                            <img
                                src={currentUser?.avatar || IMAGES.profileAvatar}
                                alt="Foto o Avatar"
                                className="profile__image"
                            />
                            <div className="profile__overlay">
                                <button 
                                    aria-label="Edit Avatar"
                                    className="profile__avatar-button"
                                    id="profile__editAvatar"
                                    type="button"
                                    onClick={() => handleOpenPopup(editAvatarPopup)}
                                ></button>
                                
                            </div>
                        </div>
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser?.name || "Nombre"}</h1>
                            <button 
                                aria-label="Edit profile"
                                className="profile__edit-button"
                                id="profile__addPlace"
                                type="button"
                                onClick={() => handleOpenPopup(editProfilePopup)}
                                ></button>
                            <div className="profile__text-wrapper">
                                <p className="profile__text">{currentUser?.about || "Cargo"}</p>
                                <div className="profile__text-hidden" style={{display: "none"}}></div>
                            </div>
                        </div>
                    </div>
                    <button 
                        aria-label="Add card"
                        className="profile__addPlace" 
                        id="profile__addPlace"
                        type="button"
                        onClick={() => handleOpenPopup(newCardPopup)}
                        >
                        <img
                            src={IMAGES.addPlaceIcon}
                            alt="Agregar lugar"
                            className="profile__addIconPlace"
                        />
                    </button>
                </section> 
                <section className="elements">
                    
                        {cards.map((card) => (
                        <Card 
                        key={card._id} 
                        card={card}
                        onDelete={() => handleDeleteCard(card._id)}
                        onCardClick={() => handleCardClick(card)}
                        onLike={handleCardLike}
                        />
                        ))}
                    
                </section> 
                {popup && (
                    <Popup onClose={handleClosePopup} title={popup.title}>
                        {popup.children}
                    </Popup>
                )}
            </main>
    );
}