// Os dados do perfil exibidos na página.
export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  // As chaves são as mesmas dos atributos name do formulário "Editar perfil",
  // para o objeto ir direto para o setInputValues() do pop-up.
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
