const db = require('../models');
const Services = require('./Services');

class TurmasServices extends Services {
    constructor() {
        super('Turmas');
    }
}

module.exports = TurmasServices;