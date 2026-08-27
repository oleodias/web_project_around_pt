# 🗺️ Around The U.S. — Ao Redor dos EUA

## 📝 Descrição do Projeto

**Around The U.S.** é uma página interativa onde o usuário monta sua própria galeria de lugares: adiciona novos cartões, remove os que não quer mais e curte as fotos favoritas.

O projeto chegou até mim já com a estrutura HTML e os estilos CSS prontos, feitos por um desenvolvedor especializado em layout a partir dos protótipos do designer. A página estava bonita, porém completamente estática — os botões não respondiam e nada era interativo. Minha parte é dar vida a ela com **JavaScript**, ao longo do Sprint 8 e dos seguintes do curso de Desenvolvimento Web da TripleTen Brasil.

Este é um cenário que se repete bastante no mercado: pegar o ponto onde um colega parou e adicionar as funcionalidades.

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
- O script é vinculado ao HTML com o atributo **`defer`**, garantindo que o JavaScript só execute depois que o documento estiver montado.

Os seis lugares são os mesmos que já apareciam na marcação: Vale de Yosemite, Lago Louise, Montanhas Carecas, Latemar, Parque Nacional da Vanoise e Lago di Braies.

> Nesta etapa os cartões continuam escritos diretamente no `index.html`. Substituí-los por cartões gerados a partir do array é o trabalho das próximas etapas.

---

## 🛠 Tecnologias Utilizadas

- **HTML5 Semântico**: marcação com `<header>`, `<main>`, `<section>`, `<footer>`, `<ul>` e `<li>`, com `alt` descritivo em todas as imagens e `aria-label` nos botões de ícone.
- **CSS3 com Metodologia BEM Flat**: cada bloco em arquivo próprio dentro de `/blocks`, importados por `pages/index.css`.
- **JavaScript (ES6+)**: array de objetos como fonte de dados e o método `forEach()` para iterar sobre a coleção.
- **Atributo `defer`**: o script é baixado em paralelo e executado só após a análise do HTML, sem travar a renderização da página.
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
│   └── index.js             ← lógica do projeto
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

1. **Geração dinâmica dos cartões**: substituir a marcação fixa por elementos criados a partir do array `initialCards`, usando `<template>` e manipulação do DOM.
2. **Formulários funcionais**: fazer os pop-ups de editar perfil e adicionar local realmente alterarem a página, com escuta de eventos de envio.
3. **Curtir e excluir**: alternar o estado do botão de curtida e remover cartões da galeria.
4. **Visualização ampliada**: abrir a foto em tela cheia ao clicar na imagem do cartão.

---

## 👤 Autor

**Leonardo Dias Caumo** — _Desenvolvido como parte do portfólio de estudos em Desenvolvimento Web da TripleTen Brasil._

---

© 2026 Leonardo Dias Caumo
