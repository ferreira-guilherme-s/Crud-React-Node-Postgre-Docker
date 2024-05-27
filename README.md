# Documentação do Serviço de Usuários

## Descrição

Este serviço lida com operações relacionadas aos usuários em uma aplicação Nest.js. Ele inclui funcionalidades como registro de usuários, login, obtenção de usuários, atualização de informações, redefinição de senha e exclusão de usuários.
Ao inicializar o projeto, a primeira tela será a de login, onde o usuário tem a opção de criar um usuário caso não seja cadastrado, ou caso ele tenha esquecido a senha, ele poderá resetar a senha.
O sistema conta com validação de tipo de usuário. Caso o usuário seja do tipo ‘Admin’, ele terá acesso a editar outros usuários, excluir usuários e criar usuários de dentro da plataforma. Quando o usuário é do tipo ‘user’, ao fazer login ele só poderá listar os usuários cadastrados no sistema e editar o seu próprio usuário. Sendo impedido de editar ou excluir outros usuários, assim como também criar usuários.
Quando um usuário faz a edição do próprio login, ele será direcionado para a tela de login novamente, pois, precisará ser feito novo login para aplicar as mudanças.
Ao configurar o seu ambiente, você pode utilizar o e-mail: admin@admin.com e a senha admin@123 para acessar o portal.

## Tecnologias Utilizadas

- Nest.js
- React
- Vite
- TypeORM
- bcryptjs
- jsonwebtoken
- PostgreSQL

## Instalação

Para instalar e inicializar o projeto, é necessário ter o Docker instalado na máquina. Com o Docker instalado, basta rodar os seguintes comandos na pasta raiz do projeto:

```bash
docker compose build
docker compose up


Endpoints

1. /users/login [POST]
Descrição: Permite que um usuário faça login na aplicação.
Corpo da Requisição:
  {
    "email": "example@example.com",
    "password": "password123"
  }
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "statusCode": 200,
    "success": true,
    "token": "<token_de_autenticação>",
    "user": {
      "id": "<id_do_usuário>",
      "userType": "<tipo_do_usuário>"
    }
  }


Resposta de Erro:
Status: 401 Unauthorized
Corpo da Resposta:
  {
    "statusCode": 401,
    "success": false,
    "message": "Invalid email or password"
  }
2. /users/getAllUsers [GET]
Descrição: Retorna todos os usuários cadastrados na aplicação.
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "statusCode": 200,
    "success": true,
    "data": {
      "users": [
        {
          "id": "<id_do_usuário>",
          "name": "<nome_do_usuário>",
          "email": "<email_do_usuário>"
        },
      ]
    }
  }
Resposta de Erro:
Status: 500 Internal Server Error
Corpo da Resposta:
  {
    "statusCode": 500,
    "success": false,
    "message": "Internal Server Error"
  }
3. /users/getUser/:id [GET]
Descrição: Retorna as informações de um usuário específico com base no ID fornecido.
Parâmetros da URL:
id: ID do usuário
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "id": "<id_do_usuário>",
    "name": "<nome_do_usuário>",
    "email": "<email_do_usuário>",
    "userType": "<tipo_do_usuário>"
  }
Resposta de Erro:
Status: 500 Internal Server Error
Corpo da Resposta:
  {
    "statusCode": 500,
    "success": false,
    "message": "Internal Server Error"
  }
4. /users/insertUser [POST]
Descrição: Permite adicionar um novo usuário à aplicação.
Corpo da Requisição:
  {
    "name": "<nome_do_usuário>",
    "email": "<email_do_usuário>",
    "password": "<senha_do_usuário>",
    "userType": "<tipo_do_usuário>"
  }
Resposta de Sucesso:
Status: 201 Created
Corpo da Resposta:
  {
    "statusCode": 201,
    "success": true,
    "message": "User created successfully"
  }
Resposta de Erro:
Status: 400 Bad Request
Corpo da Resposta:
  {
    "statusCode": 400,
    "success": false,
    "error": "User not created"
  }
5. /users/updateUser/:id [PUT]
Descrição: Permite atualizar as informações de um usuário existente com base no ID fornecido.
Parâmetros da URL:
id: ID do usuário
Corpo da Requisição:
  {
    "name": "<novo_nome_do_usuário>",
    "email": "<novo_email_do_usuário>",
    "userType": "<novo_tipo_do_usuário>"
  }
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "statusCode": 200,
    "success": true,
    "message": "User updated successfully"
  }
Resposta de Erro:
Status: 400 Bad Request
Corpo da Resposta:
  {
    "statusCode": 400,
    "success": false,
    "error": "User not updated"
  }
6. /users/deleteUser/:id [DELETE]
Descrição: Permite excluir um usuário existente com base no ID fornecido.
Parâmetros da URL:
id: ID do usuário
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "statusCode": 200,
    "success": true,
    "message": "User deleted successfully"
  }
Resposta de Erro:
Status: 500 Internal Server Error
Corpo da Resposta:
  {
    "statusCode": 500,
    "success": false,
    "message": "Internal Server Error"
  }
7. /users/resetPassword [PUT]
Descrição: Permite que um usuário redefina sua senha.
Corpo da Requisição:
  {
    "id": "<id_do_usuário>",
    "oldPassword": "<senha_antiga_do_usuário>",
    "newPassword": "<nova_senha_do_usuário>"
  }
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "statusCode": 200,
    "success": true,
    "message": "Password updated successfully"
  }
Resposta de Erro:
Status: 400 Bad Request
Corpo da Resposta:
  {
    "statusCode": 400,
    "success": false,
    "error": "Password not updated"
  }
8. /users/getUserByEmail [POST]
Descrição: Retorna as informações de um usuário com base no e-mail fornecido.
Corpo da Requisição:
  {
    "email": "<email_do_usuário>"
  }
Resposta de Sucesso:
Status: 200 OK
Corpo da Resposta:
  {
    "statusCode": 200,
    "success": true,
    "data": {
      "user": {
        "id": "<id_do_usuário>",
        "name": "<nome_do_usuário>",
        "email": "<email_do_usuário>",
        "userType": "<tipo_do_usuário>"
      }
    }
  }
Resposta de Erro:
Status: 404 Not Found
Corpo da Resposta:
  {
    "statusCode": 404,
    "success": false,
    "message": "User not found"
  }
