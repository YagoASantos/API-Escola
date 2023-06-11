const db = require('../models');

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros() {
        return db[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id) {

    }

    async criaUmRegistro(dados) {
        
    }

    async atualizaRegistros(dadosAtualizados, id, transacao = {}) {
        return db[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } }, transacao);
    }

    async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
        return db[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } }, transacao);
    }

    async apagaRegistro(id) {

    }
}

module.exports = Services;