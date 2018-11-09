require('mocha-steps');
const supertest = require('supertest');
const assert = require('assert');
const host = 'localhost';
const port = 3002;

let contextoGlobal = {};
/**
 * Teste funcionais para o serviços da API Contatos.
 * @author diegobassay
 */
describe('Iniciando teste de integração - Api Contatos - Desafio Globo.com/Meta', () => {

    const criandoServidorApiContatos = (host, port) => {
		
		const HttpServer = require('../server/HttpServer');
		
		const ContatosRestController = require('../api/ContatosRestController');

		//Crio uma instancia de HttpServer com express e posso adicionar 
		//essa instancia quando qualquer ou abstração ou modelo.
		let httpServer = new HttpServer();
		//O REST adiciona as rotas para API de Contatos.
		new ContatosRestController(httpServer.express());
		//Inicio o servidor com host e porta
		return httpServer.iniciar(host, port);
		
    };

    step('Criando Servidor API Contatos', () => {
        return criandoServidorApiContatos('localhost', 3001)
            .then((httpServer) => {
                contextoGlobal.httpServer1 = httpServer;
            });
    });

    step('Verificando Contatos Criados', () => {
        return Promise.resolve()
            .then(() => {
                return supertest(contextoGlobal.httpServer1.app)
                    .get(`/`)
                    .expect(200)
                    .expect((res) => {
                        assert.equal(res.body.length, 5, 'Eram esperados pelo menos 5 contatos');
                    });
            });
    });
	
    step('Criando Novo Contato', () => {
        return Promise.resolve()
            .then(() => {
                return supertest(contextoGlobal.httpServer1.app)
                    .post('/')
                    .send(  {
    					id: 6,
    					nome: 'Contato TDD',
    					canal: 'email',
    					valor: 'ttd@ttd.com',
    					obs: ''
  				  	})
                    .expect(201)
                    .expect((res) => {
                        assert.equal(res.text, 'Contato criado com sucesso', 'Eram esperado pelo menos 6 contatos');
                    });
            });
    });
	
	
    step('Verificando Se Id Pesquisado É Do Mesmo Objeto Retornado', () => {
        return Promise.resolve()
            .then(() => {
                return supertest(contextoGlobal.httpServer1.app)
                    .get(`/1`)
                    .expect(200)
                    .expect((res) => {
                        assert.equal(res.body.id, 1, 'ID Contato retornado é inválido');
                    });
            });
    });
	
	
    step('Verificando Se Contato Foi Removido', () => {
        return Promise.resolve()
            .then(() => {
                return supertest(contextoGlobal.httpServer1.app)
                    .delete(`/1`)
                    .expect(204)
                    .expect((res) => {
                        assert.equal(res.noContent, true, 'Houve um erro ao excluir contato');
                    });
            });
    });

});


describe('Finalizando tarefas do teste', () => {
	
	step('Finalizando Servidor Api Contatos', () => {
		return Promise.resolve()
		.then(() => {
    		return contextoGlobal.httpServer1.stop();
			y});
	});
	
});