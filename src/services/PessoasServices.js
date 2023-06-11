const db = require('../models');
const Services = require('./Services');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
    }

    async pegaRegistrosAtivos(where = {}) {
        return db[this.nomeDoModelo].findAll({ where: { ...where } });
    }

    async pegaTodosOsRegistros(where = {}) {
        return db[this.nomeDoModelo].scope('todos').findAll({ where: { ...where } });
    }
}

module.exports = PessoasServices;