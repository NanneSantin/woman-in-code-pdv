
# WIC - Woman in Code


Essa é uma RESTful API para um PDV (Ponto de Venda) ou frente de caixa, destinada a controlar categorias, usuários, clientes, produtos e pedidos utilizados por um estabelecimento comercial.

A nossa API permite realizar diversas operações, como o cadastro de usuários, autenticação, cadastro de produtos, edição de dados dos produtos cadastrados, detalhamento de produto, listagem de produtos por categorias, exclusão de produtos cadastrados, cadastro de clientes, edição de dados dos clientes cadastrados, detalhamento de cliente, listagem de clientes e cadastro de pedidos de venda. E tudo isso é gerenciado com o banco de dados PostgreSQL.


## Índice

- [Stacks Utilizadas](#stacks-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Sprints](#sprints)
- [Deploy](#deploy)
- [Documentação da API](#documentação-da-api)
- [Demonstração](#demonstração)
- [Autoras](#autoras)


## Stack utilizadas

**Front-end:** Não contemplado

**Back-end:** 
- Node.js
- Express
- PostgreSQL
- bcrypt
- cors
- dotenv
- joi
- jsonwebtoken
- knex
- pg


## Pré-requisitos

Node.js instalado (versão 12 ou superior).


## Sprints

<details>
<summary>1ª Sprint</summary>
<br>

- [X]  `GET` **`/categoria`**
- [X]  `POST` **`/usuario`**
- [X]  `POST` **`/login`**
- [X]  `GET` **`/usuario`**
- [X]  `PUT` **`/usuario`**

</details>

<details>
<summary>2ª Sprint</summary>
<br>

- [X]  `POST` **`/produto`**
- [X]  `PUT` **`/produto/:id`**
- [X]  `GET` **`/produto`**
- [X]  `GET` **`/produto/:id`**
- [X]  `DELETE` **`/produto/:id`**
- [X]  `POST` **`/cliente`**
- [X]  `PUT` **`/cliente/:id`**
- [X]  `GET` **`/cliente`**
- [X]  `GET` **`/cliente/:id`**

</details>


## Deploy

A aplicação foi implantada com sucesso e está disponível online. Você pode acessá-la através do seguinte link:

[Link da Aplicação](https://charming-erin-llama.cyclic.app)

Para explorar as funcionalidades implementadas você pode utilizar o Insomnia. O arquivo para ser importador no Insomnia também está disponível neste repositório `insomnia.json`.

![demonstracao_insomnia](https://i.imgur.com/owu3zLx.gif)

Após a importação, certifique-se de atualizar a base url para: 

```bash
  https://charming-erin-llama.cyclic.app
```

Caso encontre algum problema ou queira contribuir para o projeto, sinta-se à vontade para abrir issues ou pull requests.

Lembre-se de que a aplicação está em constante desenvolvimento, e novas funcionalidades podem ser adicionadas no futuro. Agradecemos por visitar e testar a nossa aplicação!


## Documentação da API

#### Cadastrar usuário

```http
  POST /usuario
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do usuário que utilizará o PDV |
| `email` | `string` | **Obrigatório**. E-mail do usuário que utilizará o PDV |
| `senha` | `string` | **Obrigatório**. Senha de autenticação do usuário. Deve conter no mínimo 5 caracteres. |


#### Realizar login

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `string` | **Obrigatório**. E-mail do usuário |
| `senha` | `string` | **Obrigatório**. Senha de autenticação do usuário.|


#### Listar categorias

```http
  GET /categoria
```

Não precisa de nenhuma autenticação nesta rota.


#### Detalhar usuário logado

```http
  GET /usuario
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |


#### Atualizar dados do usuário logado

```http
  PUT /usuario
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `nome` | `string` | **Obrigatório**. Nome do usuário. |
| `email` | `string` | **Obrigatório**. E-mail do usuário. |
| `senha` | `string` | **Obrigatório**. Senha de autenticação do usuário. Deve conter no mínimo 5 caracteres. |


#### Cadastrar produto

```http
  POST /produto
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `descricao` | `string` | **Obrigatório**. Descrição do produto. |
| `quantidade_estoque` | `number` | **Obrigatório**. Quantidade do produto em estoque. Deve ser um número positivo inteiro. |
| `valor` | `number` | **Obrigatório**. Valor do produto. Deve ser um número real positivo. |
| `categoria_id` | `number` | **Obrigatório**. ID da categoria correspondente. Deve ser um número inteiro positivo. |


#### Atualizar dados do produto

```http
  PUT /produto/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `id` | `number` | **Obrigatório**. ID do produto cadastrado. A ser passado como parâmetro na rota. |
| `descricao` | `string` | **Obrigatório**. Descrição do produto. |
| `quantidade_estoque` | `number` | **Obrigatório**. Quantidade do produto em estoque. Deve ser um número positivo inteiro. |
| `valor` | `number` | **Obrigatório**. Valor do produto. Deve ser um número real positivo. |
| `categoria_id` | `number` | **Obrigatório**. ID da categoria correspondente. Deve ser um número inteiro positivo. |


#### Deletar produto

```http
  DELETE /produto/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `id` | `number` | **Obrigatório**. ID do produto cadastrado. A ser passado como parâmetro na rota. |


#### Detalhar produto

```http
  GET /produto/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `id` | `number` | **Obrigatório**. ID do produto cadastrado. A ser passado como parâmetro na rota. |


#### Listar produtos cadastrados

```http
  GET /produto
  GET /produto?categoria_id=${num}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `categoria_id` | `number` | **Opcional**. A ser passado como parâmetro de consulta na rota.|


#### Cadastrar clientes

```http
  POST /cliente
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `nome` | `string` | **Obrigatório**. Nome do cliente. |
| `email` | `string` | **Obrigatório**. E-mail do cliente. |
| `cpf` | `string` | **Obrigatório**. CPF do cliente que deve ser passado no padrão "123.456.789-00" exatamente. |
| `cep` | `number` | **Opcional**. CEP do cliente que deve conter exatos 8 digítos. |
| `rua` | `string` | **Opcional**. Nome da rua. |
| `numero` | `number` | **Opcional**. Número da residência. |
| `cidade` | `string` | **Opcional**. Nome da Cidade. |
| `estado` | `string` | **Opcional**. Sigla do Estado. |


#### Atualizar dados de clientes cadastrados

```http
  PUT /cliente/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `id` | `number` | **Obrigatório**. ID do cadastro do cliente. A ser passado como parâmetro na rota. |
| `nome` | `string` | **Obrigatório**. Nome do cliente. |
| `email` | `string` | **Obrigatório**. E-mail do cliente. |
| `cpf` | `string` | **Obrigatório**. CPF do cliente que deve ser passado no padrão "123.456.789-00" exatamente. |
| `cep` | `number` | **Opcional**. CEP do cliente que deve conter exatos 8 digítos. |
| `rua` | `string` | **Opcional**. Nome da rua. |
| `numero` | `number` | **Opcional**. Número da residência. |
| `cidade` | `string` | **Opcional**. Nome da Cidade. |
| `estado` | `string` | **Opcional**. Sigla do Estado. |


#### Listar clientes cadastrados

```http
  GET /cliente
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |


#### Detalhar cliente cadastrado

```http
  GET /cliente/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token`      | `string` | **Obrigatório**. Token retornado ao usuário após realizar login. |
| `id` | `number` | **Obrigatório**. ID do cadastro do cliente. A ser passado como parâmetro na rota. |


## Demonstração

A inserir um vídeo ou gif.


## Autoras

- [@camilamariaoliveira](https://github.com/camilamariaoliveira)
- [@NanneSantin](https://github.com/NanneSantin)
- [@giovanamarriel](https://github.com/giovanamarriel)
- [@leandra-s](https://github.com/leandra-s)
- [@MelissaNP](https://github.com/MelissaNP)
