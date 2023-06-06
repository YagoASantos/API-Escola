const db = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try{
            const todasAsPessoas = await db.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaUmaPessoa(req, res){
        const { id } = req.params;
        try{
            const umaPessoa = await db.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(umaPessoa);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const pessoa = await db.Pessoas.create(novaPessoa);
            return res.status(200).json(pessoa);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try{
            await db.Pessoas.update(novasInfos, { where: { id: Number(id) } });
            const pessoaAtualizada = await db.Pessoas.findOne({ where: {id: Number(id)} });
            return res.status(200).json(pessoaAtualizada);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try{
            await db.Pessoas.destroy({ where:{ id: Number(id) } });
            return res.status(200).json({ message:'Pessoa apagada com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try{
            await db.Pessoas.restore( { where: { id: Number(id) } } );
            return res.status(200).json( { message: `Id ${id} restaurado.` } );
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaUmaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            const umaMatricula = await db.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(umaMatricula);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaMatricula(req, res){
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try{
            const matricula = await db.Matriculas.create(novaMatricula);
            return res.status(200).json(matricula);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try{
            await db.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            const matriculaAtualizada = await db.Matriculas.findOne({ where: {id: Number(matriculaId)} });
            return res.status(200).json(matriculaAtualizada);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try{
            await db.Matriculas.destroy({
                where:{
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
            } });
            return res.status(200).json({ message:'Matricula apagada com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try{
            await db.Matriculas.restore( { where: {
                    id: matriculaId,
                    estudante_id: estudanteId
                }
            } );
            return res.status(200).json( { message: `Id ${id} restaurado com sucesso.` } );
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = PessoaController;