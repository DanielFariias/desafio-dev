# CNAB API (Backend)

Backend do projeto de desafio técnico da ByCoders para processamento e gestão de transações CNAB.

---

## 🎯 Sobre o projeto

O **CNAB API** é uma aplicação backend desenvolvida com Fastify e TypeScript, focada em performance, escalabilidade e boas práticas de arquitetura moderna.

A API permite:

- Upload e processamento de arquivos `.txt` no padrão CNAB
- Armazenamento das informações em banco relacional
- Consulta de lojas e transações
- Autenticação via JWT
- Integração com frontend e documentação via Swagger
    
---

## 🛠️ Tecnologias

- Node.js + TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Docker + Docker Compose
- Vitest + ts-node-dev
- JWT para autenticação
- Repository Pattern
- @fastify/swagger (documentação da API)

---

## 🚀 Funcionalidades implementadas

### 📂 Upload de Arquivos

- Upload de arquivos `.txt` (CNAB padrão)
- Parse linha a linha
- Salvamento no banco de dados relacional
- Controle de transações duplicadas
- Validação de linhas inválidas

### 🏬 Gestão de Lojas

- Listagem paginada de lojas
    - Filtros por nome
    - Ordenação asc/desc
    - Totalizador de saldo por loja

- Listagem paginada de transações      
    - Listagem por loja
    - Filtro e ordenação das transações

### 🔐 Autenticação

- Geração de JWT
- Middleware global protegendo rotas privadas    
- Controle de acesso baseado em token
    
### 📖 Documentação

- Swagger (OpenAPI) integrado via `/docs`
- Testável diretamente pelo navegador
    
### 🧪 Testes Automatizados

- Testes unitários e de integração com Vitest
- Mocks com Repositórios em memória
- Testes de controllers, middlewares e regras de negócio

---

## 🚀 Como rodar o projeto

### 1️⃣ Pré-requisitos

- Node.js 18+
- Docker e Docker Compose instalados

### 2️⃣ Clone o repositório

```bash
git clone https://github.com/DanielFariias/desafio-dev.git
cd desafio-dev/api
```

### 3️⃣ Configure as variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cnab?schema=public
PORT=3333
JWT_SECRET=supersecretkey
```

### 4️⃣ Suba o ambiente com Docker

```bash
docker compose up -d
```

### 5️⃣ Acesse o container

```bash
docker exec -it api-fastify-1 sh 
```

- Todas as etapas abaixo dessa serão dentro do container

### 6️⃣ Instale as dependências

```bash
npm install
```

### 7️⃣ Gere o client do Prisma

```bash
npx prisma generate
```

### 8️⃣ Rode as migrations

```bash
npx prisma migrate dev
```

### 9️⃣ Rode o projeto

```bash
npm run dev
```
O servidor estará disponível em `http://localhost:3333`

---

## 📝 Documentação da API

Acesse a documentação Swagger da API em:  
👉 [http://localhost:3333/docs](http://localhost:3333/docs)

---

## 🎯 Testes

Para rodar os testes:

```bash
npm run test
```

Os testes cobrem:
- Upload + deduplicação de transações
- Listagem paginada + filtros + ordenação
- Cenários de erro e validações
- Auth com JWT 
- Rotas publicas e privadas

---

## 📋 Considerações finais

Projeto finalizado para entrega do desafio técnico com:

- Arquitetura limpa e modular
- Separação de responsabilidades (controllers, repositories, helpers)
- Testes automatizados
- Controle completo de erros e duplicidades
- Documentação interativa via Swagger
- Infraestrutura pronta com Docker

---

Desenvolvido por Daniel Farias