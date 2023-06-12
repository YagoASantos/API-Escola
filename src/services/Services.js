const db = require('../models');

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros() {
        return db[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id) {
        return db[this.nomeDoModelo].findOne({ where: { id: Number(id) } });
    }

    async criaUmRegistro(dados) {
        return db[this.nomeDoModelo].create(dados);
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return db[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } }, transacao);
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return db[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } }, transacao);
    }

    async apagaRegistro(id) {
        return db[this.nomeDoModelo].destroy( { where: { id: Number(id) } } );
    }

    async restauraRegistro(id) {
        return db[this.nomeDoModelo].restore({ where: { id: Number(id) } });
    }
}

module.exports = Services;