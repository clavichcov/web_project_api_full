import { useState } from 'react';
export function EditAvatar({onEditAvatar}) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleSubmit = (e) => {
            e.preventDefault();
            onEditAvatar({ link: avatarUrl }); 
        };
  return (
    <form
      className="form--avatar"
      name="avatar-form"
      id="new-avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="form__wrapper">
        <input
          className="form__input form__input_type_avatar-name"
          id="avatar-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength="30"
          minLength="1"
          name="avatar-name"
          placeholder="Nombre"
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="form__wrapper">
        <input
          className="form__input form__input_type_url"
          id="avatar-link"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          name="link"
          placeholder="Link del avatar"
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