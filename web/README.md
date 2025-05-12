# CNAB Web (Frontend)

Frontend do projeto de desafio técnico da ByCoders para processamento e gestão de transações CNAB.

---

## 🎯 Sobre o projeto

O **CNAB Web** é uma aplicação frontend desenvolvida em React + TypeScript + Vite, com foco em performance, responsividade e boas práticas de arquitetura.

Ele se conecta a um backend (também do desafio) para permitir:

- Upload de arquivos `.txt` no padrão CNAB
- Processamento e exibição das lojas e transações
- Controle de autenticação via JWT

---

## 🛠️ Tecnologias utilizadas

- React 19 + Vite
- TypeScript
- ESLint + Prettier
- React Router DOM
- Axios (com Interceptor para JWT)
- CSS Modules + Sass (sem frameworks)
- react-hot-toast para feedbacks visuais
- Sistema de design system próprio (variables + breakpoints)

---

## 🚀 Funcionalidades implementadas

### 📂 Upload

- Upload de arquivos CNAB `.txt`
- Drag & drop + validação do formato
- Revalidação automática da tabela após upload

### 🏬 Dashboard

- Listagem de lojas (`GET /stores`)
- Exibição de saldo total por loja (positivo ou negativo)
- Ações para visualizar detalhes da loja

### 📝 Detalhes da Loja

- Listagem de transações da loja (`GET /stores/:storeId/transactions`)
- Exibição de valores positivos/negativos com regras reais do CNAB
- Subtotal de transações da loja

### 🔐 Autenticação

- Tela de login (`POST /auth/login`)
- Armazenamento seguro do token JWT
- Interceptor global no Axios
- Protected Routes (RequireAuth)
- Logout global

---

## 💻 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Backend do projeto já rodando (`VITE_API_URL` apontando para ele)

### Instalação

```bash
# Clone o projeto
git clone https://github.com/DanielFariias/desafio-dev.git
cd desafio-dev/web

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com a variável:

```env
VITE_API_URL=http://localhost:3333
```

(ou a URL onde o backend está rodando)

### Execução

```bash
# Iniciar o projeto em modo desenvolvimento
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## ✔️ Scripts disponíveis

```bash
npm run dev       # Inicia em modo desenvolvimento
npm run build     # Gera build de produção
npm run preview   # Visualiza build de produção localmente
npm run lint      # Roda ESLint para análise estática
```

---

## 📋 Considerações finais

Projeto finalizado para entrega do desafio técnico com:

- Código limpo e modular
- Responsividade completa
- Estrutura pronta para escala
- Cobertura completa das regras do desafio

A aplicação foi pensada para refletir o padrão de projetos profissionais de mercado.

---

Desenvolvido por Daniel Farias
