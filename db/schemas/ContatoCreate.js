const schema = require("schm");

const ContatoCreate = schema({
  	id: Number,
  	nome: String,
	canal: String,
	valor: String,
	obs: String
});