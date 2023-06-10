const db = require('../models');
const Sequelize = require('sequelize');
const Services = require('../Services/Services');
const pessoasServices = new Services('Pessoas');

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try{
            const pessoasAtivas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(pessoasAtivas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaPessoasAtivas(req, res) {
        try{
            const pessoasAtivas = await db.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
    static async pegaTodasAsPessoas(req, res) {
        try{
            const todasAsPessoas = await db.Pessoas.scope('todos').findAll();
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

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try{
            const pessoa = await db.Pessoas.findOne( { where: { id: Number(estudanteId) } } );
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch(err) {

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

    static async pegaMatriculasPorTurma(req, res){
        const { turmaId } = req.params;
        try{
            const todasAsMatriculas = await db.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
            });
            return res.status(200).json(todasAsMatriculas);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 2;
        try{
            const turmasLotadas = await db.Matriculas.findAndCountAll(
                {
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                }
            );
            return res.status(200).json(turmasLotadas.count);
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

    static async cancelaPessoa (req, res) {
        const { estudanteId } = req.params;
        try{
            db.sequelize.transaction(async transacao => {
                await db.Pessoas.update({ ativo: false }, { where: {
                        id: Number(estudanteId)
                    }
                }, {transaction: transacao});
                await db.Matriculas.update({ status: 'cancelado' }, { where: {
                    estudante_id: estudanteId
                    }
                }, {transaction: transacao});
                return res.status(200).json({ message: `As matrículas referente ao id ${estudanteId} foram canceladas.` });
            })
        } catch(err) {
            return res.status(200).json(err.message)
        }
    }
}

module.exports = PessoaController;