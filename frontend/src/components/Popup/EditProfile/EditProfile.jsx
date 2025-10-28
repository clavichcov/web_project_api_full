import { useState } from 'react';
export function EditProfile({onEditProfile}) {
  const [name, setName] = useState("");
      const [about, setAbout] = useState("");
  
      const handleSubmit = (e) => {
          e.preventDefault();
          onEditProfile({ name, about }); 
      };
  return (
    <form
      className="form--profile"
      onSubmit={handleSubmit}
      name="profile-form"
      id="profile-form"
      noValidate
    >
      <label className="form__wrapper">
        <input
          className="form__input form__input-type-profile-name"
          id="profile-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength="40"
          minLength="2"
          name="profile-name"
          placeholder="Nombre"
          required
          type="text"
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>
      <label className="form__wrapper">
        <input
          className="form__input form__input-type-about"
          id="profile-about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength="200"
          minLength="2"
          name="link"
          placeholder="Acerca de mí"
          required
          type="text"
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="form__place_submit" type="submit">
        Guardar
      </button>
    </form>
  );
}