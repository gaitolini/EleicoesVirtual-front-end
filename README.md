# Frontend do Projeto Eleições Virtuais 🌐🚀

Bem-vindo ao repositório do frontend do projeto Eleições Virtuais! Este repositório contém o código do lado do cliente, desenvolvido utilizando Vue.js para criar uma interface moderna e interativa que visa simular um processo eleitoral virtual. ✨

O objetivo deste projeto é criar uma aplicação de MVP (Minimum Viable Product) que simula um ambiente de eleições, permitindo aos usuários criar, visualizar e gerenciar eleições de forma virtual. A ideia é contribuir para o estímulo da democracia e o aprendizado sobre o processo eleitoral, com foco tanto em um propósito educacional quanto em um portfólio pessoal para demonstrar minhas habilidades como desenvolvedor Fullstack e DevOps em Cloud.

## ⚡ Tecnologias e Ferramentas Utilizadas

- **JavaScript**: Linguagem principal usada para a lógica do frontend.
- **Vue.js**: Framework JavaScript utilizado para a criação de componentes reutilizáveis e renderização reativa.
- **HTML e CSS**: Para estrutura e estilização das páginas.
- **Firebase**: Hospedagem, Autenticação e Database foram utilizados através do Firebase, incluindo Hosting e Firestore para armazenamento dos dados.
- **Node.js**: Utilizado para configuração e implantação com Firebase CLI.
- **GitHub**: Controle de versão e CI/CD.

## 🏠 Funcionalidades do Projeto Atual
- **Autenticação**: Login utilizando autenticação via Google e e-mail/senha com o Firebase.
- **Gestão de Eleições**: Possibilidade de criar novas eleições, listar, editar, e deletar eleições criadas.

> **Nota**: Este repositório representa o frontend do projeto. O backend foi desenvolvido em Go Lang e pode ser encontrado [aqui](https://github.com/gaitolini/EleicoesVirtual-back-end). 🌐

## 🙌 Processo de Desenvolvimento

### 1. Estruturação do Projeto com Vue.js

O Vue.js foi utilizado como o framework principal para o frontend. Cada funcionalidade foi separada em componentes reutilizáveis para facilitar a manutenção e expansão futura do projeto. Por exemplo, temos componentes como:
- **LoginPage.vue**: Componente responsável pela página de login e cadastro.
- **DashboardEleicoes.vue**: Componente que mostra a tela principal após o login.
- **CreateElection.vue**: Componente que permite criar uma nova eleição.

Cada componente Vue tem a estrutura de template, script e style, proporcionando uma arquitetura organizada e modular.

### 2. Hospedagem e Configuração no Firebase 🛠

A hospedagem do frontend foi realizada utilizando o Firebase Hosting, uma ferramenta prática que oferece uma maneira rápida e segura para hospedar aplicações web.

- **Firebase Hosting**: Configuração do projeto para a hospedagem foi feita através do CLI do Firebase.
- **Firebase Auth**: Utilizado para a autenticação dos usuários, permitindo login com Google ou e-mail/senha.
- **Firestore Database**: Banco de dados NoSQL para armazenar as eleições criadas.

### 3. Workflow e Deploy 🛠️🌟

- **Configuração do Ambiente**: Utilizando Node.js e npm para instalar dependências e configurar o projeto.
~~~bash
npm install
~~~

- **Build do Projeto**: Geração dos arquivos otimizados para produção.
~~~bash
npm run build
~~~

- **Deploy para o Firebase**: Após a geração do build, utilizamos o CLI do Firebase para hospedar o projeto.
~~~bash
firebase deploy
~~~

## ✍️ Como Executar o Projeto Localmente

### Requisitos:
- Node.js instalado (v12+)
- Firebase CLI configurado

### Passos:
1. Clone o repositório do GitHub:
~~~bash
git clone https://github.com/gaitolini/EleicoesVirtual-front-end.git
~~~

2. Instale as dependências:
~~~bash
cd EleicoesVirtual-front-end
npm install
~~~

3. Execute o servidor de desenvolvimento:
~~~bash
npm run serve
~~~

4. Acesse em seu navegador: [http://localhost:8080](http://localhost:8080)

## 🌐 Objetivo do Projeto
Este projeto visa oferecer uma plataforma para simular eleições virtuais, permitindo aos usuários criar e participar de eleições de maneira didática e segura. Além de ser uma excelente vitrine para meu portfólio pessoal, ele também serve para propósitos educacionais e para fomentar o aprendizado sobre o valor da democracia e do processo eleitoral.

Este repositório é parte do projeto completo, cujo backend foi desenvolvido separadamente, e é mantido [neste repositório do GitHub](https://github.com/gaitolini/EleicoesVirtual-back-end).

## Contato 🛡️
Se você deseja saber mais sobre o projeto ou discutir futuras colaborações, sinta-se à vontade para entrar em contato comigo:

- LinkedIn: [Anderson Gaitolini](https://www.linkedin.com/in/andersongaitolini/)
- WhatsApp: [Entre em contato](https://youtu.be/IGP38bz-K48?si=62Khct2-dAFR3qn5)

## Estrutura do Projeto 📁

~~~
.firebase
.github
.github\workflows
dist
eleicoes-virtual
node_modules
public
src
.firebaserc
.gitattributes
.gitignore
babel.config.js
firebase_credentials_base64.txt
firebase.json
jsconfig.json
package-lock.json
package.json
README.md
vue.config.js
~~~

Agradeço pela sua atenção e por visitar meu projeto! Este é apenas o começo do que espero desenvolver, não só para mostrar minhas habilidades técnicas, mas também para contribuir com um projeto educativo que demonstra o valor da democracia. ✨

