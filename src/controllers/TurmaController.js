const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {

    static async pegaTodasAsTurmas (req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {};
        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;

        try{
            const turmas = await db.Turmas.findAll( { where } );
            return res.status(200).json(turmas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaUmaTurma (req, res) {
        const { id } = req.params;
        try{
            const turma = await db.Turmas.findOne({where: {id: Number(id)}});
            return res.status(200).json(turma);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaTurma (req, res) {
        const turma = req.body;
        try{
            const novaTurma = await db.Turmas.create(turma);
            return res.status(200).json(novaTurma);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaTurma (req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try{
            await db.Turmas.update(novasInfos, {where: {id: Number(id)}});
            const turma = db.Turmas.findOne({where: {id: Number(id)}});
            return res.status(200).json(turma);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaTurma (req, res) {
        const { id } = req.params;
        try{
            await db.Turmas.destroy({where: {id: Number(id)}});
            return res.status(200).json({ message: 'Turma excluída com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraTurma (req, res) {
        const { id } = req.params;
        try{
            await db.Turmas.restore( { where: {id: Number(id)} } );
            return res.status(200).json( { message: `Id ${id} restaurado com sucesso.` } );
        } catch(err) {

        }
    }
}

module.exports = TurmaController;