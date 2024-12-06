# Task Master

## Descrição do Projeto

O **Task Master** é uma aplicação full-stack simples para gerenciamento de tarefas (To-Do List). O projeto foi desenvolvido utilizando **Nuxt 3** para o frontend e backend, e **MySQL** como banco de dados. Ele permite criar, listar, atualizar e deletar tarefas, com interface intuitiva e estilização básica.

---

## Tecnologias Utilizadas

### Full-stack
- **Nuxt 3** (frontend e backend)
- **Vue 3**
- **Bootstrap 5** para estilização básica

### Banco de Dados
- **MySQL**
- **Sequelize** como ORM

### Geral
- **Docker** para ambiente de desenvolvimento e banco de dados
- **Git** para controle de versão

---

## Funcionalidades

### API para Gerenciamento de Tarefas
- **Criar tarefa** (título, descrição, data de vencimento)
- **Listar tarefas**
- **Atualizar status da tarefa** (pendente/concluída)
- **Deletar tarefa**

### Interface de Usuário
- ~~Página para listar tarefas~~
- ~~Formulário para adicionar nova tarefa~~
- ~~Opção para marcar tarefa como concluída~~
- ~~Exibir data de vencimento no fuso horário local do usuário~~

---

## Requisitos de Configuração

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js (v16 ou superior) e npm instalados

### Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/cintiamasumi/task_master.git
   cd task_master
   ```

2. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env`.
   - Atualize as configurações no `.env` conforme necessário.
   - Dados env. 
   ```bash
        DB_HOST=127.0.0.1
        DB_USER=root
        DB_PASSWORD=secret
        DB_NAME=task_master
    ```
3. Inicie o ambiente Docker:
   ```bash
   docker-compose up --build 
   ```

4. Instale as dependências do projeto:
   ```bash
   npm install
   ```

5. Execute as migrações para configurar o banco de dados:
   ```bash
   npm run migration:run
   ```



---

## Como Executar o Projeto

### Ambiente de Desenvolvimento
1. Inicie o servidor de desenvolvimento:
   ```bash
   docker-compose up -d db (se quiser apenas subir o banco)
   npm run dev
   ```
2. Acesse a aplicação no navegador: [http://localhost:3000](http://localhost:3000)

### Ambiente de Produção
1. Construa o projeto:
   ```bash
   npm run build
   ```
2. Inicie o servidor de produção:
   ```bash
   npm run start
   ```
3. Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

---

## Rotas da API

### Gerenciamento de Tarefas
- **Listar Tarefas:**
  ```
  GET localhost:3000/api/tasks
  ```
- ** Criar Tarefa:** 
    ```
    POST localhost:3000/api/tasks
    Json: {
        "title":"Teste Cintia",
        "description": "teste1",
        "Status": "pendente",
        "due_date": "2024-12-09"
    }
    ```
- **Atualizar Status da Tarefa:**
  ```
  PUT localhost:3000/api/tasks
  Json: {
    "id": 1,
    "status": "Concluida"
  }
  ```
- ** Deletar Tarefa**
    ```
    DELETE localhost:3000/api/tasks/2
    ```

---

## Estrutura do Projeto

- **`pages/`**: Contém as páginas da aplicação.
- **`server/api/`**: Contém as rotas e controladores da API.
- **`server/models/`**: Modelos Sequelize para a interação com o banco de dados.
- ~~**`components/`**: Componentes reutilizáveis da interface.~~
- ~~**`assets/`**: Arquivos estáticos como imagens e estilos globais.~~


---

## Considerações Adicionais
- O banco de dados está configurado para rodar em um container Docker, garantindo portabilidade e fácil configuração.
- A manipulação de datas é feita para suportar fuso horário local, melhorando a experiência do usuário.
- Para garantir a qualidade do código, foi utilizado Husky para pre-commit hooks e convenções de commit.

---

## Próximos Passos
- Implementar autenticação de usuários.
- Adicionar testes automatizados para garantir a confiabilidade do sistema.
- Implementar Interface
---
