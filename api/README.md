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

## 📋 Endpoints da API

### 🔐 Auth

#### POST /auth/register
Registra um novo usuário.

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

**Respostas:**
- 201 Created: Usuário criado com sucesso.
- 409 Conflict: Usuário já existente.

---

#### POST /auth/login
Realiza o login e retorna o token JWT.

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

**Respostas:**
- 200 OK: Retorna `{ "access_token": "seu-jwt-token" }`
- 401 Unauthorized: Credenciais inválidas.

---

### 🏬 Stores (Privado - Requer Bearer Token)

#### GET /stores
Lista lojas com saldo total.

**Query params (opcional):**
- page: número da página (default: 1)
- limit: itens por página (default: 10)
- name: filtro pelo nome da loja
- order: asc ou desc para ordenação por nome

**Respostas:**
```json
{
  "page": 1,
  "limit": 10,
  "totalCount": 2,
  "hasNextPage": false,
  "data": [
    {
      "id": "uuid",
      "name": "Loja Teste",
      "ownerName": "Carlos",
      "balance": 1000
    }
  ]
}
```

---

#### GET /stores/:storeId/transactions
Lista as transações de uma loja específica.

**Path param:**
- storeId: ID da loja

**Query params (opcional):**
- page: número da página (default: 1)
- limit: itens por página (default: 10)
- order: asc ou desc para ordenação por data da transação

**Respostas:**
```json
{
  "page": 1,
  "limit": 10,
  "totalCount": 3,
  "hasNextPage": false,
  "data": [
    {
      "id": "uuid",
      "type": "DEBIT",
      "transactionAt": "2024-05-10T12:00:00.000Z",
      "value": 500,
      "cpf": "12345678900",
      "card": "1234****5678"
    }
  ]
}
```

---

### 💳 Transactions (Privado - Requer Bearer Token)

#### POST /transactions/upload
Faz upload e processamento do arquivo CNAB .txt.

**Header:**
- Content-Type: multipart/form-data

**Body:**
- campo `file`: arquivo .txt

**Respostas:**
```json
{
  "message": "File processed successfully",
  "inserted": 10,
  "duplicates": 2,
  "invalid": 1
}
```

**Erros:**
- 400 Bad Request: Sem arquivo enviado

---

# 📝 Observações
Todas as rotas (exceto /auth/*) requerem autenticação via Bearer Token JWT.

Use `/auth/login` para obter o token e adicione no header:

```makefile
Authorization: Bearer <seu-token>
```

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