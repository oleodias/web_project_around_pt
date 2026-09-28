// Os dados do perfil exibidos na página.
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // As chaves são as mesmas do servidor e dos atributos name do formulário
  // "Editar perfil": o objeto vai direto para o setInputValues() do pop-up.
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  // Recebe o objeto do usuário como o servidor o devolve.
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = `Foto de perfil de ${name}`;
  }
}
