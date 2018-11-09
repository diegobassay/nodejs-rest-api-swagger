#!/usr/bin/env node

const HttpServer = require('./server/HttpServer');
const ContatosRestController = require('./api/ContatosRestController');
const host = 'localhost';
const port = 3002;
//Crio uma instancia de HttpServer com express e posso adicionar essa instancia quando qualquer ou abstração ou modelo.
let httpServer = new HttpServer();
//O REST adiciona as rotas para API de Contatos.
new ContatosRestController(httpServer.express());
//Inicio o servidor com host e porta
httpServer.iniciar(host, port);