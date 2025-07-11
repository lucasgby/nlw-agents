# 💡 NLW Agents — Demonstração

Este projeto é uma aplicação completa desenvolvida durante um evento educacional da **Rocketseat**, com foco em explorar o uso de agentes inteligentes na web.

O sistema é dividido em duas partes principais:

- **Frontend** construído com tecnologias modernas como **React**, **Tailwind CSS** e **TypeScript**.
- **Backend** baseado em **Node.js** e **Fastify**, com banco de dados relacional e suporte a vetores.

O objetivo principal é demonstrar como construir aplicações web modernas, performáticas e escaláveis utilizando boas práticas e ferramentas atuais do ecossistema JavaScript/TypeScript.

---

## ✨ Principais Funcionalidades

- Interface web interativa e responsiva
- Agentes inteligentes integrados
- API REST moderna e performática
- Armazenamento estruturado com banco PostgreSQL
- Validação, tipagem e organização de código com ferramentas robustas

---

## 📁 Estrutura Geral

```text
.
├── frontend/   # Interface web do projeto
└── server/     # API e lógica de negócio
```

---

## 🚀 Tecnologias Utilizadas

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Shadcn/UI
- Vite

### Backend

- Node.js com TypeScript nativo
- Fastify
- PostgreSQL + pgvector
- Drizzle ORM
- Zod
- Docker

---

## 🧪 Demonstração Local

Para rodar o projeto localmente, é necessário instalar as dependências e iniciar o backend e o frontend:

```bash
# 1. Inicie o banco de dados
docker-compose up -d

# 2. Rode o backend
cd server
npm install
npx drizzle-kit migrate
npm run dev

# 3. Rode o frontend
cd ../frontend
npm install
npm run dev
```

---

## 📌 Observações

- A API roda na porta `3333`
- A interface web pode ser acessada em `http://localhost:5173`
- Este projeto tem fins educacionais e de demonstração

---

Feito com 💜 para explorar novas possibilidades com agentes inteligentes e tecnologias modernas.