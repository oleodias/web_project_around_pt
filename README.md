# 🗺️ Around The U.S. — Ao Redor dos EUA

## 📝 Descrição do Projeto

**Around The U.S.** é uma página interativa onde o usuário monta sua própria galeria de lugares: adiciona novos cartões, remove os que não quer mais e curte as fotos favoritas.

O projeto chegou até mim já com a estrutura HTML e os estilos CSS prontos, feitos por um desenvolvedor especializado em layout a partir dos protótipos do designer. A página estava bonita, porém completamente estática — os botões não respondiam e nada era interativo. Minha parte é dar vida a ela com **JavaScript**, ao longo do Sprint 8 e dos seguintes do curso de Desenvolvimento Web da TripleTen Brasil.

Este é um cenário que se repete bastante no mercado: pegar o ponto onde um colega parou e adicionar as funcionalidades.

---

## 🚩 Sprint 12 — Conectado ao servidor

A página deixou de guardar os dados em memória: perfil, foto e cartões agora
vêm do servidor do projeto e são salvos nele. Recarregar a página mantém tudo.

### O que o usuário pode fazer

- Ver o perfil e os cartões carregados do servidor
- Editar nome e descrição
- Trocar a foto do perfil: passando o mouse na foto aparece o lápis, e o
  clique abre o formulário
- Adicionar cartões, curtir e descurtir
- Excluir os **próprios** cartões, depois de confirmar no pop-up "Tem
  certeza?". Cartões de outras pessoas não têm lixeira
- Enquanto uma solicitação está em andamento, o botão do formulário mostra
  **"Salvando..."**

### `Api` — toda a comunicação com o servidor

| Método | Solicitação |
| --- | --- |
| `getUserInfo()` | `GET /users/me` |
| `getInitialCards()` | `GET /cards` |
| `getAppInfo()` | as duas acima com `Promise.all` |
| `setUserInfo({ name, about })` | `PATCH /users/me` |
| `setUserAvatar({ avatar })` | `PATCH /users/me/avatar` |
| `addCard({ name, link })` | `POST /cards` |
| `deleteCard(cardId)` | `DELETE /cards/:cardId` |
| `changeLikeStatus(cardId, isLiked)` | `PUT` ou `DELETE /cards/:cardId/likes` |

- Cada método faz `return fetch(...)`: devolve a promessa, e quem decide o que
  fazer com os dados é o `index.js`.
- **`_checkResponse`** é escrito uma vez só: se `res.ok`, lê o JSON; senão,
  rejeita com `Error: <status>`. É necessário porque o `fetch` só rejeita
  quando a rede falha — um 404 ou 500 chegaria ao `then()` como se tivesse
  dado certo.
- Uma única instância, criada no `index.js` com o endereço do servidor e o
  token.

### A ordem das coisas

- **Os cartões só são desenhados depois de chegar o id do usuário.**
  `getAppInfo()` espera usuário **e** cartões; só então cada cartão sabe se é
  do usuário e se mostra a lixeira.
- **A página só muda depois de o servidor confirmar.** O coração troca de cor
  com o `isLiked` que volta da resposta, o cartão só sai da página depois do
  `DELETE`, e o pop-up só fecha depois de salvar. Se der erro, nada muda na
  tela, o erro vai para o console e o botão volta ao texto original.
- **Todo envio de formulário passa pela mesma função**, `handleSubmit()`:
  mostra "Salvando...", faz a solicitação, fecha o pop-up se deu certo e, no
  `finally()`, devolve o texto do botão.

### Classes novas e alteradas

| Classe | O que mudou |
| --- | --- |
| `Api` | nova — veja acima |
| `PopupWithConfirmation` | nova, filha de `Popup`: o "Tem certeza?". Não sabe o que está confirmando; a ação chega por `setSubmitAction()` a cada abertura, já com o cartão certo |
| `Card` | recebe o id do usuário e três callbacks (imagem, lixeira, coração). Ganhou `getId()`, `isLiked()`, `setLikeState()` e `removeCard()`, que o `index.js` chama depois da resposta do servidor |
| `PopupWithForm` | ganhou `renderLoading()`, que troca o texto do botão |
| `PopupWithImage` | ganhou `close()`: limpa imagem, texto alternativo e legenda ao fechar |
| `UserInfo` | passou a cuidar também da foto; usa `about`, o nome que o servidor usa |
| `Section` | os itens chegam em `renderItems(items)`, porque só existem depois da resposta do servidor |

---

## 🚩 Sprint 11 — Pop-ups, seção e usuário em classes

A refatoração continua: o que ainda eram funções soltas virou classe, e o
`index.js` ficou só com a criação das instâncias e os ouvintes.

| Classe | Responsabilidade |
| --- | --- |
| `Section` | recebe uma lista e uma função `renderer`, e põe cada item no contêiner. Não tem marcação própria nem sabe o que está renderizando |
| `Popup` | abre e fecha um pop-up; fecha pelo X, pela sobreposição e pelo Esc |
| `PopupWithImage` | filha de `Popup`: preenche imagem e legenda antes de abrir |
| `PopupWithForm` | filha de `Popup`: lê os campos, entrega os dados a um callback e limpa o formulário ao fechar |
| `UserInfo` | lê e grava o nome e a descrição do perfil na página |
| `Card` | recebe `handleCardClick` de fora: o cartão avisa que foi clicado, e o `index.js` decide abrir o pop-up |
| `FormValidator` | sem mudanças |

### Acoplamento fraco

Nenhuma classe cria instância de outra. As ligações são feitas no
`index.js`, por meio de callbacks: o `Card` não conhece o `PopupWithImage`, o
`PopupWithForm` não sabe se está editando o perfil ou criando um cartão, e a
`Section` não sabe que o que ela renderiza são cartões.

### `bind` e ouvintes removíveis

`Popup` e `Card` prendem os próprios manipuladores com `bind` no construtor.
Isso resolve duas coisas de uma vez: o `this` continua sendo a instância
quando o método é passado ao `addEventListener`, e existe uma referência fixa
para o `removeEventListener`. É assim que o ouvinte do Esc é removido ao
fechar o pop-up, e que o cartão desliga os próprios ouvintes ao ser excluído.

---

## 🚩 Sprint 10 — Classes e módulos

Toda a funcionalidade já existia; esta etapa reorganizou o código. O que era
um `index.js` com tudo dentro virou quatro arquivos, cada um com uma
responsabilidade só.

| Arquivo | Responsabilidade |
| --- | --- |
| `scripts/Card.js` | a classe `Card`: um cartão, com os próprios dados e os próprios botões |
| `scripts/FormValidator.js` | a classe `FormValidator`: a validação de um formulário |
| `scripts/utils.js` | abrir e fechar pop-ups, Esc, sobreposição e o pop-up de imagem |
| `scripts/index.js` | a página: dados iniciais, instâncias e ouvintes |

### `Card`

- **`new Card(data, templateSelector)`** recebe o nome, o link da imagem e o
  seletor do `<template>`.
- **`generateCard()`** é o único método público: clona o template, preenche,
  registra os ouvintes e devolve o cartão pronto para entrar na página.
- Os métodos privados (`_getTemplate`, `_setCardData`, `_setEventListeners`,
  `_handleLikeClick`, `_handleDeleteClick`, `_handleImageClick`) cuidam de
  cada parte.
- O cartão só registra ouvintes nos **próprios** botões. O pop-up de imagem é
  um só para a página inteira, então o cartão pede para abri-lo
  (`openImagePopup`, de `utils.js`), mas não pendura ouvinte nele — senão cada
  cartão novo acrescentaria mais um.

### `FormValidator`

- **`new FormValidator(config, formElement)`** recebe o objeto de configuração
  e o formulário. Uma instância para cada formulário.
- **`setEventListeners()`** inicia a validação.
- **`resetValidation()`** limpa os erros ao abrir o pop-up.
- Os métodos privados usam os campos da instância (`this._inputs`,
  `this._submitButton`) em vez de receber os mesmos dados a cada chamada.

### Módulos

Os quatro arquivos se conectam por `import`/`export`, e o `index.html` carrega
só o ponto de entrada:

```html
<script type="module" src="./scripts/index.js"></script>
```

Cada módulo tem escopo próprio: nada é declarado no escopo global da página.

> **Módulos precisam de servidor local.** Aberto com dois cliques
> (`file://`), o navegador bloqueia os scripts. Veja "Como executar
> localmente".

---

## 🚩 Sprint 9 — Validação dos formulários e pop-ups

Os formulários deixaram de aceitar qualquer coisa, e os pop-ups passaram a
fechar como o usuário espera.

### Validação — `scripts/validate.js`

- **Uma função universal.** `enableValidation(validationConfig)` percorre todos
  os formulários da página e liga a validação em cada um. As funções internas
  não sabem se estão validando "Editar perfil" ou "Novo local": recebem os
  seletores e as classes pelo objeto de configuração.
- **A regra mora no HTML**, em `required`, `minlength`, `maxlength` e `type`.
  O JavaScript só lê o veredito pelo **`ValidityState`** — `input.validity.valid`
  — em vez de recontar caracteres por conta própria. Uma fonte de verdade só:
  mudar o `minlength` no HTML muda o comportamento sem tocar no script.
- **As mensagens são as do navegador**, lidas em `input.validationMessage` e
  exibidas no `<span class="popup__error">` que fica ao lado de cada campo.
- **`toggleButtonState()`** é a função separada que controla o botão de envio:
  ele fica inativo enquanto **qualquer** campo estiver inválido.
- **`resetValidation()`** limpa as mensagens ao abrir um pop-up, para que os
  erros da vez anterior não reapareçam.

| Campo | Regra |
| --- | --- |
| Nome | obrigatório, 2 a 40 caracteres |
| Sobre mim | obrigatório, 2 a 200 caracteres |
| Título | obrigatório, 2 a 30 caracteres |
| Link de Imagem | obrigatório, precisa ser uma URL |

O `novalidate` nos formulários desliga as bolhas de aviso nativas — **não** a
validação. O navegador continua avaliando os campos; quem decide como mostrar
o resultado passa a ser o projeto.

### Fechamento dos pop-ups — `scripts/index.js`

- **Clique na sobreposição** fecha; clique **dentro** do formulário, não. A
  distinção é `evt.target === evt.currentTarget`: o evento só veio da
  sobreposição se começou nela, e não num filho.
- **Tecla Esc** fecha o pop-up aberto. O ouvinte é adicionado em `openModal()`
  e **removido** em `closeModal()` — por isso `handleEscapeKey` é uma função
  nomeada: `removeEventListener` só remove o ouvinte se receber a mesma
  referência que foi registrada.
- Os três pop-ups compartilham o mesmo ouvinte de fechamento, registrado uma
  vez com `forEach`, em vez de três blocos iguais.

---

## 🚩 Etapa Final — Cartões dinâmicos

A galeria deixou de ser marcação fixa e passou a ser gerada por JavaScript.

- **`<template id="card-template">`** dentro do `<ul class="cards__list">` guarda o molde de um cartão. Os seis cartões escritos à mão saíram do HTML.
- **`getCardElement(data)`** clona o molde, preenche imagem e título, registra os ouvintes e **devolve** o elemento — sem inseri-lo.
- **`renderCard(data)`** insere o cartão no início da lista.
- **Curtir** alterna a classe `card__like-button_is-active`, trocando o coração vazio pelo preenchido.
- **Excluir** remove o cartão do DOM.
- **Clicar na imagem** abre o pop-up com a versão ampliada e o título como legenda.
- **"Novo local"** cria o cartão com os dados digitados, limpa o formulário e fecha o pop-up. O cartão novo entra como **primeiro** da lista.

Cada cartão guarda a referência aos próprios botões por **closure** — não há
`id` por cartão nem busca no documento. Nenhum dado digitado pelo usuário é
atribuído a `innerHTML`.

---

## 🚩 Etapa 2 — Modal de perfil

O pop-up de "Editar perfil" ganhou vida.

- **`openModal(modal)`** e **`closeModal(modal)`** recebem um elemento modal e alternam a classe `popup_is-opened`. Servem a **qualquer** modal — contêm apenas o que vale para todos.
- O pop-up **abre** ao clicar no botão de editar e **fecha** no botão X.
- Ao abrir, os campos "Nome" e "Sobre mim" já vêm **preenchidos com os dados atuais** do perfil.
- Ao **salvar**, o nome e a descrição da página são atualizados e o pop-up se fecha.

O envio usa `preventDefault()` para impedir o recarregamento da página, e a
gravação é feita com `textContent` — nenhum dado digitado pelo usuário é
atribuído a `innerHTML`.

---

## 🚩 Etapa 1 — Seu próprio conjunto de dados

Antes de gerar os cartões dinamicamente, é preciso ter os dados. Esta etapa monta a fonte de informação que vai alimentar a galeria nas próximas entregas.

- **Array `initialCards`** declarado no topo de `scripts/index.js`, com **seis objetos**.
- Cada objeto carrega duas propriedades: **`name`**, o título do local, e **`link`**, a URL da imagem.
- **`forEach()`** percorre o array no final do arquivo e exibe o `name` de cada cartão no console do navegador.
- O script é vinculado ao HTML logo antes de `</body>`, garantindo que o JavaScript só execute depois que o documento estiver montado. (Até a Sprint 8 isso era feito com o atributo `defer` no `<head>`.)

Os seis lugares são os mesmos que já apareciam na marcação: Vale de Yosemite, Lago Louise, Montanhas Carecas, Latemar, Parque Nacional da Vanoise e Lago di Braies.

> Nesta etapa os cartões continuam escritos diretamente no `index.html`. Substituí-los por cartões gerados a partir do array é o trabalho das próximas etapas.

---

## 🛠 Tecnologias Utilizadas

- **HTML5 Semântico**: marcação com `<header>`, `<main>`, `<section>`, `<footer>`, `<ul>` e `<li>`, com `alt` descritivo em todas as imagens e `aria-label` nos botões de ícone.
- **CSS3 com Metodologia BEM Flat**: cada bloco em arquivo próprio dentro de `/blocks`, importados por `pages/index.css`.
- **JavaScript (ES6+)**: array de objetos como fonte de dados e o método `forEach()` para iterar sobre a coleção.
- **API de validação do navegador**: `ValidityState`, `validationMessage` e o atributo `novalidate` para validar os formulários sem reescrever as regras em JavaScript.
- **Programação orientada a objetos**: classes ES6 (`Card` e `FormValidator`) com métodos privados por convenção (`_`) e um método público cada.
- **Módulos ES6**: `import`/`export` entre os componentes, carregados a partir de `src/pages/index.js` com `type="module"`.
- **Herança**: `PopupWithImage` e `PopupWithForm` estendem `Popup` e sobrescrevem `open()`, `close()` e `setEventListeners()` com `super`.
- **Callbacks e `bind`**: as classes se comunicam por funções recebidas no construtor, e os manipuladores de eventos têm `this` e referência fixos.
- **`fetch` e promessas**: solicitações `GET`, `POST`, `PATCH`, `PUT` e `DELETE` a uma API REST, com `then`, `catch`, `finally` e `Promise.all`.
- **Fontes locais**: família Inter conectada via `@font-face` em formato `.woff2`.
- **Normalize.css**: reset de estilos consistente entre navegadores.

---

## 📐 Estrutura do Projeto

```
web_project_around_pt/
├── src/
│   ├── blocks/                  ← Blocos BEM (CSS por componente)
│   ├── components/              ← Uma classe por arquivo
│   │   ├── Api.js
│   │   ├── Card.js
│   │   ├── FormValidator.js
│   │   ├── Popup.js
│   │   ├── PopupWithConfirmation.js
│   │   ├── PopupWithForm.js
│   │   ├── PopupWithImage.js
│   │   ├── Section.js
│   │   └── UserInfo.js
│   ├── images/                  ← Ícones da interface e avatar
│   ├── pages/
│   │   ├── index.css            ← Orquestrador de imports
│   │   └── index.js             ← Instâncias e ouvintes
│   ├── utils/
│   │   └── constants.js         ← Servidor, configuração e seletores
│   ├── vendor/
│   │   ├── fonts/               ← Arquivos .woff2 da fonte Inter
│   │   ├── fonts.css
│   │   └── normalize.css
│   └── index.html
└── README.md
```

---

## 💻 Como executar localmente

```bash
cd src
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`. No VS Code, a extensão **Live Server**
faz o mesmo: botão direito no `src/index.html` → "Open with Live Server".

O servidor é obrigatório: como os scripts são módulos, abrir o `index.html`
direto do disco faz o navegador bloqueá-los, e a página fica sem cartões.

---

## 📈 Planos de Melhoria

Funcionalidades previstas para as próximas etapas do projeto:

1. **Animação de abertura**: transição suave ao abrir e fechar os pop-ups.
2. **Mensagens próprias**: substituir as mensagens padrão do navegador por
   textos mais específicos, com `setCustomValidity()`.
3. **Erros na tela**: hoje uma falha do servidor vai para o console; o
   próximo passo é avisar o usuário na própria página.

> Concluídos: fechar com Esc e com clique na sobreposição, e a validação dos
> formulários (Sprint 9); persistência dos dados no servidor (Sprint 12).

---

## 👤 Autor

**Leonardo Dias Caumo** — _Desenvolvido como parte do portfólio de estudos em Desenvolvimento Web da TripleTen Brasil._

---

© 2026 Leonardo Dias Caumo
