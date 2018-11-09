const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('static-favicon');
const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
/**
 * Classe que representa a instancia do servidor web assim como suas configurações usando express 4
 * @author diegobassay
 */
class HttpServer {
	
	/**
	 * Iniciando a configuração do express.
	 */
	constructor(){
		
        this.app = express();
		
        this.servidor = http.createServer(this.app);

        this.app.use(bodyParser.json());

        this.app.set('view engine', 'ejs');
        
		this.app.set('views', path.join(__dirname, 'views'));
        
		this.app.use(bodyParser.json());
        
		this.app.use(bodyParser.urlencoded({ extended: true }));
        
		this.app.use(cookieParser());

        this.app.locals.formatters = {
            time: (rawTime) => {
                const timeInMS = new Date(rawTime * 1000);
                return `${timeInMS.toLocaleString()} - ${timeago().format(timeInMS)}`;
            },
            hash: (hash) => {
                return hash != '0' ? `${hash.substr(0, 5)}...${hash.substr(hashString.length - 5, 5)}` : '<empty>';
            },
            amount: (amount) => amount.toLocaleString()
        };
		
        this.app.use((err, req, res, next) => {
			
            if (err instanceof HTTPError) res.status(err.status);
            else res.status(500);
            res.send(err.message + (err.cause ? ' - ' + err.cause.message : ''));
        });
		
	}
	
	/**
	 * Retorna a instancia do express
	 */
	express(){

        var router = express.Router();

        this.app.use('/contatosapi', router);
		
		return router;
		
	}
	
	/**
	 * Chama o metodo listen e inicia a instancia do servidor http.
	 */
    iniciar(host, port) {
        return new Promise((resolve, reject) => {
            this.server = this.servidor.listen(port, host, (err) => {
                if (err) reject(err);
                console.info(`Servidor iniciado na porta : ${this.server.address().port}`);
				console.info(`Acesse (http://localhost:${this.server.address().port}/contatosapi/swagger) para testar os serviços`)
				resolve(this);
            });
        });
    }
	
	/**
	 * Encerra servidor http. 
	 */
    stop() {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) reject(err);
                console.info('Finalizando servidor');
                resolve(this);
            });
        });
    }
	
}

module.exports = HttpServer