const projetos = require('../models/projetos')

const index = async(dependencies, req, res) => {
    const projeto = await projetos.getProjetos(dependencies, req.query)

    res.render('projetos/index', {
        projeto
    })
}

const createForm = async({ db }, req, res) => {
    const pessoa = await db('pessoas')
                            .select('*')
                            .orderBy('nome')

    res.render('projetos/create', {
        pessoa
    })
}

const createProcess = async(dependencies, req, res) => {
    await projetos.createProjeto(dependencies, req.body)

    res.redirect('/projetos')
}

const editForm = async(dependencies, req, res) => {
    const { db } = dependencies
    const pessoa = await db('pessoas')
                            .select('*')
                            .orderBy('nome')
    const projeto = await projetos.getProjetosById(dependencies, req.params.id)

    res.render('projetos/edit', {
        projeto,
        pessoa
    })
}

const editProcess = async(dependencies, req, res) => {
    await projetos.editProjeto(dependencies, req.body, req.params.id)

    res.redirect('/projetos')
}

const deleteOne = async(dependencies, req, res) => {
    await projetos.deleteProjeto(dependencies, req.params.id)

    res.redirect('/projetos')
}

module.exports = {
    index,
    createForm,
    createProcess,
    editForm,
    editProcess,
    deleteOne
}