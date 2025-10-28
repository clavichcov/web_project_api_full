import {IMAGES} from '../../../utils/constants.jsx';

export function InfoTooltip({ isSuccess }) {

    return (
    <>
        
        <div className="registration__info">
            <img 
                className="registration__info_image" 
                src={isSuccess ? IMAGES.imgCorrect : IMAGES.imgError} 
                alt={isSuccess ? "Registro correcto" : "Error en registro"} 
            />
      
            <h2 
                className="registration__info_title"> 
                    {isSuccess 
                        ? "¡Correcto! Ya estás registrado." 
                        : "Uy, algo salió mal. Por favor, inténtalo de nuevo."
                    }
            </h2>
        </div>
              
    </>
    );
}