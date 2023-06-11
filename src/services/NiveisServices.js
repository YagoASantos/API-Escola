const db = require('../models');
const Services = require('./Services');

class NiveisServices extends Services {
    constructor() {
        super('Niveis');
    }
}

module.exports = NiveisServices;