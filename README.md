# 🗺️ Around The U.S. — Ao Redor dos EUA

## 📝 Descrição do Projeto

**Around The U.S.** é uma página interativa onde o usuário monta sua própria galeria de lugares: adiciona novos cartões, remove os que não quer mais e curte as fotos favoritas.

O projeto chegou até mim já com a estrutura HTML e os estilos CSS prontos, feitos por um desenvolvedor especializado em layout a partir dos protótipos do designer. A página estava bonita, porém completamente estática — os botões não respondiam e nada era interativo. Minha parte é dar vida a ela com **JavaScript**, ao longo do Sprint 8 e dos seguintes do curso de Desenvolvimento Web da TripleTen Brasil.

Este é um cenário que se repete bastante no mercado: pegar o ponto onde um colega parou e adicionar as funcionalidades.

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
- **Scripts no fim do `<body>`**: `validate.js` e `index.js` executam com o documento já montado, sem travar a renderização.
- **Fontes locais**: família Inter conectada via `@font-face` em formato `.woff2`.
- **Normalize.css**: reset de estilos consistente entre navegadores.

---

## 📐 Estrutura do Projeto

```
web_project_around_pt/
├── blocks/                  ← Blocos BEM (CSS por componente)
│   ├── card.css
│   ├── cards.css
│   ├── content.css
│   ├── footer.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   └── profile.css
├── images/                  ← Ícones da interface e avatar
├── pages/
│   └── index.css            ← Orquestrador de imports
├── scripts/
│   ├── index.js             ← lógica do projeto
│   └── validate.js          ← validação universal dos formulários
├── vendor/
│   ├── fonts/               ← Arquivos .woff2 da fonte Inter
│   ├── fonts.css
│   └── normalize.css
├── index.html
└── README.md
```

---

## 💻 Como executar localmente

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` e pressione **F12** para ver os nomes dos seis cartões listados no console.

---

## 📈 Planos de Melhoria

Funcionalidades previstas para as próximas etapas do projeto:

1. **Persistência**: manter os cartões adicionados após recarregar a página.
2. **Animação de abertura**: transição suave ao abrir e fechar os pop-ups.
3. **Mensagens próprias**: substituir as mensagens padrão do navegador por
   textos mais específicos, com `setCustomValidity()`.

> Concluídos na Sprint 9: fechar com Esc e com clique na sobreposição, e a
> validação dos dois formulários.

---

## 👤 Autor

**Leonardo Dias Caumo** — _Desenvolvido como parte do portfólio de estudos em Desenvolvimento Web da TripleTen Brasil._

---

© 2026 Leonardo Dias Caumo
