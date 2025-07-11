# NLW Agents

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias e Bibliotecas Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastfy**: Framework para criação de APIs REST.
- **Drizzle**: ORM para manipulação de banco de dados.
- **SQLite**: Banco de dados leve utilizado no desenvolvimento.
- **TypeScript**: Superset do JavaScript para tipagem estática.

## Padrões de Projeto

- **MVC (Model-View-Controller)**: Organização do código em camadas.
- **Repository Pattern**: Abstração do acesso a dados.
- **Service Layer**: Lógica de negócio separada dos controladores.

## Setup e Configuração

1. Clone o repositório:
  ```bash
  git clone <url-do-repo>
  cd nlw-agents
  ```

2. Instale as dependências:
  ```bash
  npm install
  ```
3. Suba os containers Dockers:
  ```bash
  docker compose up -d
  ``` 
4. Configure o banco de dados:
  ```bash
  npm run db:migrate
  ```
5. Inicie o servidor:
  ```bash
  npm run dev
  ```

Pronto! O projeto estará rodando localmente.
