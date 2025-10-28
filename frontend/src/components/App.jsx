import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {Header} from '../components/Header/Header.jsx';
import {IMAGES} from '../utils/constants.jsx';
import {Login} from '../components/Login/Login.jsx';
import {Register} from '../components/Register/Register.jsx';
import { Main } from '../components/Main/Main.jsx';
import { Footer } from './Footer/Footer.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import  Api  from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import { setToken, getToken} from "../utils/token";
import  CurrentUserContext  from '../contexts/CurrentUserContext.js';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({username:"", email:""});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    
  const handleRegistration = ({ email, password }) => {
    return auth.register(email, password)
        .then((data) => {
            return data;
        })
        .catch(error => {
            console.error("Error en registro:", error);
            throw error;
        });
}

  const handleLogin = ({email, password}) => {
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
        .then((data) => {
          
          if (data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            setCurrentUser({
              username: email,
              email: email
            });
            const redirectPath = location.state?.from?.pathname || "/users/me";
            navigate(redirectPath);
          }
        })
        .catch(console.error);
  }

  
    
    const createApiAcces = () => {
      const jwt = getToken();
      if (!jwt) return null;
    
      return new Api({
        baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`, 
        }
      });
    };

    useEffect (() => {
      const apiInstance = createApiAcces();
      if (!apiInstance ) return;
      apiInstance
        .getUserInfo()
        .then ((userData) => {
          console.log('👤 User info response:', userData);
          setCurrentUser({
            username: userData.data.email,
            email:userData.data.email});
          setIsLoggedIn(true);
        
      })
      .catch(console.error);
    },[]);

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Header apiAcces={createApiAcces} ></Header>
                <Main apiAcces={createApiAcces}></Main>
                <Footer></Footer>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/me" 
            element={
              <ProtectedRoute>
                <Header apiAcces={createApiAcces}></Header>
                <Main apiAcces={createApiAcces}></Main>
                <Footer></Footer>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signin" 
            element={
              <ProtectedRoute anonymous={true}>
                <Login handleLogin={handleLogin}/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute anonymous={true}>
                <Register handleRegistration={handleRegistration}/>
              </ProtectedRoute>
            } 
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        
      </CurrentUserContext.Provider>
    </>
    
  )
}

