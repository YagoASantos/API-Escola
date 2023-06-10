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
}

module.exports = Services;