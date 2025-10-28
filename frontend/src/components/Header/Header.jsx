import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {IMAGES} from '../../utils/constants.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import { removeToken } from "../../utils/token";

export function Header({createApiAcces}) {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(CurrentUserContext);
    const location = useLocation();
    function signOut () {
        removeToken();
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate("/signin");
    }
    function pagePath () {
        if (location.pathname === "/signup") {
            navigate("/signin");
        } else if (location.pathname === "/signin" ) {
                    navigate("/signup");
                }
        
    }
    const getButtonText = () => {
        if (location.pathname === "/signup") {
            return 'Iniciar sesión';
        } else if (location.pathname === "/signin" ) {
                    return 'Registrarse';
                } else if (isLoggedIn) {
                    return 'Cerrar sesión';
                }
    };
    
    return (
        <header className="header">
        <div className= "header__container">
            <img src={IMAGES.logo} alt="Around the U.S. Logo" className="header__logo" />
            <div style={{ display: isLoggedIn ? 'none' : 'flex' }} className="header__user--unlogged">
                <button className="header__button header__button--signin" onClick={pagePath}>{getButtonText()}</button>
            </div>
            <div style={{ display: isLoggedIn ? 'flex' : 'none' }} className="header__user--logged">
                <div className="header__email">{currentUser?.email}</div>
                <button className="header__button header__button--signout" onClick={signOut}>{getButtonText()}</button>
            </div>
        </div>
        <img src={IMAGES.line} alt="Line" className="header__line" />

        </header>
    );
    
}
