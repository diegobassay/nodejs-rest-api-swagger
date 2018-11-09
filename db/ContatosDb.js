const low = require('lowdb')
/**
 * Classe usada para modificar o estado da aplicação, banco de dados local usando lowdb
 * @author diegobassay
 */
class ContatosDb{
	/**
	 * Classe instanciada apenas uma vez no RestController
	 * Executo a ciração de registros default
	 */
	constructor(){
		
		var fs = require('fs');
		fs.unlinkSync('contatos-db.json');

		const FileSync = require('lowdb/adapters/FileSync')
		const adapter = new FileSync('contatos-db.json')
		this.db = low(adapter)
		this.db.defaults({ contatos: []}).write();
		this.db.get('contatos')
  	  	.push({ id: 1, nome: 'Diego Costa', canal: 'email', valor:'diegobassay@gmail.com', obs: 'Email do Diego'})
		.push({ id: 2, nome: 'Luke Skywalker', canal: 'telefone', valor:'990907654', obs: 'Telefone do Luke'})
		.push({ id: 3, nome: 'Darth Vader', canal: 'fixo', valor:'34345678', obs: 'Telefone da Casa do Vader'})
		.push({ id: 4, nome: 'Han Solo', canal: 'email', valor:'harisonford@yahoo.com', obs: 'Email do Han Solo'})
		.push({ id: 5, nome: 'Mestre Yoda', canal: 'email', valor:'yoda@jedi.com', obs: 'Email do Mestre Yoda'})
  	  	.write();
		
	}
	
	/**
	 * Metodo do modelo que retorna um contato pelo id
	 */
	buscarContatosPorId(idContato){
		
		return this.db.get('contatos').find({ id: parseInt(idContato) }).value();
		
	}
	
	/**
	 * Retorna lista com todos os contatos.
	 */
	buscarTodosOsContatos(){
		
		return this.db.get('contatos').value();	
		
	}
	
	/**
	 * Remove um determinado contato por idContato
	 */
	removerContato(idContato){
		
		let Contato = this.db.get('contatos').find({ id: parseInt(idContato) }).value();
		let statusOp = null;
		
		if(Contato == undefined){
			statusOp = 0;
		}else{
			this.db.get('contatos').remove({ id: parseInt(idContato) }).write();
			statusOp = 1;
		}
		
		return statusOp;
	}
	
	/**
	 * Criar um novo registro de contato no banco
	 */
	criarContato(ContatoCreate){
		
		let Contato = this.db.get('contatos').find({ id: parseInt(ContatoCreate.id) }).value();
		let statusOp = null;
		
		if((Contato != undefined) || 
			(!ContatoCreate.hasOwnProperty('id') || 
			 !ContatoCreate.hasOwnProperty('nome') || 
			 !ContatoCreate.hasOwnProperty('canal') || 
			 !ContatoCreate.hasOwnProperty('valor'))){
			statusOp = 0;
		}else{
			this.db.get('contatos').push(ContatoCreate).write();
			statusOp = 1;
		}
		
		return statusOp;		
	}
	
	/**
	 * Realiza as operações de update
	 */
	atualizarContato(ContatoUpdate){
		
		let Contato = this.db.get('contatos').find({ id: parseInt(ContatoUpdate.id) }).value();
		let statusOp = null;
		
		if(Contato == undefined){
			statusOp = 0;
		}else{
			this.db.get('contatos').find({ id: ContatoUpdate.id }).assign(ContatoUpdate).write();
			statusOp = 1;
		}
		
		return statusOp;		
	}
	
}

module.exports = ContatosDb;