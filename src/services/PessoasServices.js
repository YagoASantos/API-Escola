const db = require('../models');
const Services = require('./Services');
const Sequelize = require("sequelize");

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return db[this.nomeDoModelo].findAll({ where: { ...where } });
    }

    async pegaTodosOsRegistros(where = {}) {
        return db[this.nomeDoModelo].scope('todos').findAll({ where: { ...where } });
    }

    async cancelaPessoaEMatriculas(estudanteId) {
        return db.sequelize.transaction(async transacao => {
           await super.atualizaRegistro({ ativo: false }, estudanteId,
           { transaction: transacao });
           await this.matriculas.atualizaRegistros({ status: 'cancelado' },
           { estudante_id: estudanteId }, { transaction: transacao });
        });
    }

    async pegaUmaMatricula(estudanteId, matriculaId) {
        return db[this.matriculas].findOne({
            where: {
                id: Number(matriculaId),
                estudante_id: estudanteId
            }
        });
    }

    async pegaMatriculasPorTurma(id) {
        return db[this.matriculas].findAndCountAll({
            where: {
                turma_id: id,
                status: 'confirmado'
            },
            limit: 20,
            order: ['estudante_id', 'DESC']
        });
    }

    async pegaTurmasLotadas(lotacao) {
        return db[this.matriculas].findAndCountAll({
            where: { status: 'confirmado' },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)
        });
    }

    async criaMatricula(novaMatricula) {
        return db[this.matriculas].create(novaMatricula);
    }

    async apagaMatricula(estudanteId, matriculaId) {
        return db[this.matriculas].destroy({
            where:{
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }
        });
    }

    async restauraMatricula(estudanteId, matriculaId) {
        return db[this.matriculas].restore({ where: {
                id: matriculaId,
                estudante_id: estudanteId
            }
        });
    }
}

module.exports = PessoasServices;