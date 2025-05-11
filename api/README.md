# CNAB Parser API

API para importação e consulta de transações financeiras baseada em arquivos CNAB.  
Desenvolvida para o desafio técnico ByCoders.

---

## 🛠️ Tecnologias

- Node.js + TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Docker + Docker Compose
- Vitest + ts-node-dev
- Repository Pattern
- @fastify/swagger (documentação da API)

---

## 🚀 Como rodar o projeto

### 1️⃣ Requisitos

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
```

### 4️⃣ Suba o ambiente com Docker

```bash
docker compose up -d
```

### 5️⃣ Instale as dependências

```bash
npm install
```

### 6️⃣ Gere o client do Prisma

```bash
npx prisma generate
```

### 7️⃣ Rode as migrations (se necessário)

```bash
npx prisma migrate dev
```

### 8️⃣ Rode o projeto

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

---

## 📝 Documentação da API

Acesse a documentação Swagger da API em:  
👉 [http://localhost:3333/docs](http://localhost:3333/docs)

---

## 🎯 Endpoints

### POST `/transactions/upload`

Upload de um arquivo CNAB `.txt` para importação das transações financeiras.

- Formato `multipart/form-data`
- Campo obrigatório: `file`

Exemplo usando `curl`:
```bash
curl -F "file=@CNAB.txt" http://localhost:3333/transactions/upload
```

### GET `/stores`

Lista todas as lojas importadas + saldo calculado.

Query params opcionais:
- `page`: número da página (default: 1)
- `limit`: limite de resultados (default: 10)
- `name`: filtro por nome da loja
- `order`: `asc` ou `desc` (ordenação pelo nome)

Exemplo:
```bash
GET http://localhost:3333/stores?page=1&limit=5&name=loja&order=asc
```

---

## ✅ Regras de negócio

- Arquivo CNAB com tamanho fixo de linhas (81 posições)
- Transações duplicadas são detectadas e não são inseridas novamente
- Linha malformada no CNAB = erro contabilizado (mas processo continua)

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

---

## 💡 Arquitetura do projeto

- Controller + Repository Pattern
- Prisma Client centralizado
- Error handling global com Fastify
- Separação clara de responsabilidades (SOLID)
