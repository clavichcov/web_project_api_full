export function RemoveCard({onConfirm}) {
  return (
    <form
      className="form--place"
      name="card-form"
      id="new-card-form"
      noValidate
    >
      
      <button 
      className="form__submit-delete-button" 
      type="button"
      onClick={onConfirm}>
        Eliminar
      </button>
    </form>
  );
}