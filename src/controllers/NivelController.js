const db = require('../models');
const Services = require('../services/Services');
const niveisServices = new Services('Niveis');

class NivelController {
    static async pegaTodosOsNiveis (req, res) {
        try{
            const niveis = await niveisServices.pegaTodosOsRegistros();
            return res.status(200).json(niveis);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaUmNivel (req, res) {
        const { id } = req.params;
        try{
            const nivel = await db.Niveis.findOne({
                where: {
                    id: id
                }
            });
            return res.status(200).json(nivel);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaNivel (req, res) {
        const novoNivel = req.body;
        try{
            const nivel = await db.Niveis.create(nivel);
            return res.status(201).json(nivel);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaNivel (req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try{
            await db.Niveis.update(novasInfos, {where: {id: Number(id)}});
            const nivel = await db.Niveis.findOne({where: {id: Number(id)}});
            return res.status(200).json(nivel);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaNivel (req, res) {
        const { id } = req.params;
        try{
            await db.Niveis.destroy({where: {id: Number(id)}});
            return res.status(200).json({ message: 'Nivel apagado com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraNivel (req, res) {
        const { id } = req.params;
        try{
            await db.Niveis.restore( { where: { id: Number(id) } } );
            return res.status(200).json( { message: `Id ${id} excluído com sucesso.` } );
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = NivelController;