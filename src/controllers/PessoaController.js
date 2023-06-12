const Sequelize = require('sequelize');
const { PessoasServices } = require('../Services');
const pessoasServices = new PessoasServices();

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try{
            const pessoasAtivas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(pessoasAtivas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaUmaPessoa(req, res){
        const { id } = req.params;
        try{
            const umaPessoa = await pessoasServices.pegaUmRegistro(id);
            return res.status(200).json(umaPessoa);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const pessoa = await pessoasServices.criaUmRegistro(novaPessoa);
            return res.status(200).json(pessoa);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try{
            await pessoasServices.atualizaRegistro(novasInfos, id);
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id);
            return res.status(200).json(pessoaAtualizada);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try{
            await pessoasServices.apagaRegistro(id);
            return res.status(200).json({ message:'Pessoa apagada com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try{
            await pessoasServices.restauraRegistro(id);
            return res.status(200).json( { message: `Id ${id} restaurado.` } );
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try{
            const pessoa = await pessoasServices.pegaUmRegistro(estudanteId);
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch(err) {

        }
    }
    static async pegaUmaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            const umaMatricula = await pessoasServices.pegaUmaMatricula(estudanteId, matriculaId);
            return res.status(200).json(umaMatricula);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaMatriculasPorTurma(req, res){
        const { turmaId } = req.params;
        try{
            const todasAsMatriculas = await pessoasServices.pegaMatriculasPorTurma(turmaId);
            return res.status(200).json(todasAsMatriculas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 2;
        try{
            const turmasLotadas = await pessoasServices.pegaTurmasLotadas(lotacaoTurma);
            return res.status(200).json(turmasLotadas.count);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaMatricula(req, res){
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try{
            const matricula = await pessoasServices.criaMatricula(novaMatricula);
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
            const matriculaAtualizada = await pessoasServices.pegaUmaMatricula(estudanteId, matriculaId);
            return res.status(200).json(matriculaAtualizada);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try{
            await pessoasServices.apagaMatricula(estudanteId, matriculaId);
            return res.status(200).json({ message:'Matricula apagada com sucesso!' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try{
            await pessoasServices.restauraMatricula(estudanteId, matriculaId);
            return res.status(200).json( { message: `Id ${id} restaurado com sucesso.` } );
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async cancelaPessoa (req, res) {
        const { estudanteId } = req.params;
        try{
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
            return res.status(200).json({ message: `As matrículas referente ao id ${estudanteId} foram canceladas.` });
        } catch(err) {
            return res.status(200).json(err.message)
        }
    }
}

module.exports = PessoaController;