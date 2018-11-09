const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require('./swagger.json');
const favicon = require('static-favicon');
const cookieParser = require('cookie-parser');
const http = require('http');
const ContatosDb = require('../db/ContatosDb');

/**
 * Classe que contém os endpoints para os serviços da APi Contatos.
 * @author diegobassay
 */
class ContatosRestController {
	
	/**
	 * Recebo a instancia do express vinda do objeto HttpServer.
	 * Adiciono as configurações de serviços antes de acionar o 'listen' do express. 
	 */
    constructor(app) {
		
		var contatosDb = new ContatosDb();
		
		this.app = app;

        var options = {
          customCss: '.swagger-ui .topbar { display: none }',
          explorer : false
        };

        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
		
        this.app.put('/:idContato', (req, res) => {
			
			let statusOp = contatosDb.atualizarContato(req.body);
			
            if (statusOp == 1) res.status(200).send('Contato atualizado com sucesso');
            else if (status == 0) res.status(404).send('Contato não encontrado');
            else throw new HTTPError(409, 'O serviço de está indisponivel');
			
        });	
		
        this.app.get('/:idContato', (req, res) => {
			
			let idContato = req.params.idContato;
			
            res.status(200).send(contatosDb.buscarContatosPorId(idContato));
        });	
		
		
        this.app.get('/', (req, res) => {
			
			let idContato = req.params.idContato;
			
            res.status(200).send(contatosDb.buscarTodosOsContatos());
        });
		
		
        this.app.post('/', (req, res) => {
			
			let statusOp = contatosDb.criarContato(req.body);
			
            if (statusOp == 1) res.status(201).send('Contato criado com sucesso');
            else if (statusOp == 0) res.status(400).send('Existe um contato com esse \'id\' ou os campos \'valor\', \'valor\' ou \'valor\' não foram informados');
            else throw new HTTPError(409, 'O serviço de está indisponivel');
			
        });
		
        this.app.delete('/:idContato', (req, res) => {
			
			let idContato = req.params.idContato;
			
			let statusOp = contatosDb.removerContato(idContato);
			
            if (statusOp == 1) res.status(204).send('Contato removido com sucesso');
            else if (statusOp == 0) res.status(400).send('O idContato informado não está disponivel');
            else throw new HTTPError(409, 'O serviço de está indisponivel');
        });	
		
    }


}

module.exports = ContatosRestController;