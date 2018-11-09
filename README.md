# node-rest-api-swagger
Projeto REST usando a entidade contato

Aplicativo com as funcionalidades CRUD implementadas com Node.js, usando Mocha, SuperTest, LowDB, Express 4, Swagger

## Pré-requisitos

* Node.js >= 6.x.x

## Preparando o projeto

Para executar o projeto executar o seguinte comando na raiz do projeto:
```
npm install
```
## Para executar o projeto
Depois de executar o passo acima executar o seguinte comando na raiz do projeto:
```
npm start
```
## Para testar a API
Foi incorporado swagger para testar requisições para a API, para acessar o Swagger digite o seguinte endereço:
```
http://localhost:3002/contatosapi/swagger/#/
```
## Para Executar os testes de integração
Executar o seguinte comando na raiz do projeto:
```
npm test
```
## Serviços Contatos API 

|Metodo|URL|Descrição|
|------|---|-----------|
|GET|/contatosapi/|Todos os contatos|
|GET|/contatosapi/{idContato}|Obtem um objeto contato|
|POST|/contatosapi/|Cria um objeto de contato|
|PUT|/contatosapi/{idContato}|Atualiza um objeto de contato|
|DELETE|/contatosapi/{idContato}|Remove um objeto de contato|