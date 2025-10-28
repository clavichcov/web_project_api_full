


export function Popup (props) {
    const {onClose, title, children} = props;
    return (
        <div className="popup">
            
            <div className={`popup__container  ${
                    !title ? "popup--image-content" : "popup__container"
                    }`}>
                {!title && (
                    <>
                        {children}
                        <button
                            aria-label="Close modal"
                            className="popup--image-close-button"
                            type="button"
                            onClick={onClose}
                        />
                    </>
                )}    
                {title && (
                    <>
                        <div className="popup__container_form">
                            <h3 className="popup__title">{title}</h3>
                            {children}
                    
                        </div>
                        <button
                            aria-label="Close modal"
                            className="popup__close_button"
                            type="button"
                            onClick={onClose}
                        />
                    </>
                    
                )} 
                
            </div>
        </div>
    );
}

