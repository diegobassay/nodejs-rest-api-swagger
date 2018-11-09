const schema = require("schm");

const Contato = schema({
  	id: Number,
  	nome: String,
	canal: String,
	valor: String,
	obs: String
});