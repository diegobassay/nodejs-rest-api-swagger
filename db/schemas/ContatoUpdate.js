const schema = require("schm");

const ContatoUpdate = schema({
  	id: Number,
  	nome: String,
	canal: String,
	valor: String,
	obs: String
});