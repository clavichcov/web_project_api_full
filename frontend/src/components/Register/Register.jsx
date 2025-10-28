import { IMAGES } from "../../utils/constants";
import { Popup } from "../Popup/Popup.jsx";
import {Header} from '../Header/Header.jsx';
import { InfoTooltip } from "../Popup/InfoTooltip/InfoTooltip.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";



export function Register({ handleRegistration}) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
            
    });
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
     };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(data)
            .then(() => {
                setIsSuccess(true);
                setIsInfoTooltipOpen(true);
                setTimeout(() => {
                    navigate("/signin");
                }, 5000);
            })
            .catch(() => {
                setIsSuccess(false);
                setIsInfoTooltipOpen(true);
            });
    };

    const closeInfoTooltip = () => {
        setIsInfoTooltipOpen(false);
    };


    

    
    return (
        <>  
            <Header></Header>
            <div className="register">
                <div className="register__container">
                    <h2 className="register__title">Regístrate</h2>
                    <form className="register__form" name="loginForm" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            className="register__input"
                            placeholder="Correo electrónico"
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="register__input"
                            placeholder="Contraseña"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="register__button">Regístrate</button>
                        <p className="login__text">
                            ¿Ya eres miembro? {" "}
                            <Link to="/signin" className="login__text-link">Inicia sesión aquí</Link>
                        </p>
                    </form>
                </div>
            </div>
            {/* Popup con InfoTooltip - Solo se muestra cuando isInfoTooltipOpen es true */}
            {isInfoTooltipOpen && (
                <Popup onClose={closeInfoTooltip} title="">
                    <InfoTooltip isSuccess={isSuccess} />
                </Popup>
            )}
        </>
        
    );
}