import { IMAGES } from "../../utils/constants";
import {Header} from '../Header/Header.jsx';
import { useState } from "react";
import { Link } from 'react-router-dom';


export function Login({handleLogin}) {
    
        const [data, setData] = useState({
            email: "",
            password: "",
        }
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };
    return (
        <>  
            <Header></Header>
        <div className="login">
            <div className="login__container">
                <h2 className="login__title">Iniciar sesión</h2>
                <form className="login__form" name="loginForm" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        className="login__input"
                        placeholder="Correo electrónico"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="login__input"
                        placeholder="Contraseña"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login__button">Iniciar sesión</button>
                    <p className="register__text">
                        ¿Aún no eres miembro? {" "}
                    <Link to="/signup" className="register__text-link"> Regístrate aquí</Link>
                    </p>
                </form>
            </div>
        </div>
        </>
        
    );
}