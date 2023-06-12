const { NiveisServices } = require('../services');
const niveisServices = new NiveisServices();

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
            const nivel = await niveisServices.pegaUmRegistro(id);
            return res.status(200).json(nivel);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaNivel (req, res) {
        const novoNivel = req.body;
        try{
            const nivel = await niveisServices.criaUmRegistro(novoNivel);
            return res.status(201).json(nivel);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaNivel (req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try{
            await niveisServices.atualizaRegistro(novasInfos, id);
            const nivel = await niveisServices.pegaUmRegistro(id);
            return res.status(200).json(nivel);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaNivel (req, res) {
        const { id } = req.params;
        try{
            await niveisServices.apagaRegistro(id);
            return res.status(200).json({ message: 'Nivel apagado com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraNivel (req, res) {
        const { id } = req.params;
        try{
            await niveisServices.restauraRegistro(id);
            return res.status(200).json( { message: `Id ${id} excluído com sucesso.` } );
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = NivelController;