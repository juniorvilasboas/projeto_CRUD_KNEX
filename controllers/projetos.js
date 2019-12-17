const pessoas = require('../models/pessoas')
const projetos = require('../models/projetos')

const index = async(connection, req, res) => {
    const results = await projetos.findAll(connection)

    res.render('projetos/index', { projetos: results })
}

const createForm = async(connection, req, res) => {
    const results = await pessoas.findAll(connection)

    res.render('projetos/create', {
        pessoas: results
    })
}

const createProcess = async(connection, req, res) => {
    await projetos.create(connection, req.body)

    res.redirect('/projetos')
}

const updateForm = async(connection, req, res) => {
    const projeto = await projetos.findById(connection, req.params.id)
    const pessoa = await pessoas.findAll(connection)

    res.render('projetos/update', {
        projeto,
        pessoa
    })
}

const updateProcess = async(connection, req, res) => {
    await projetos.update(connection, req.params.id, req.body)

    res.redirect('/projetos')
}

const deleteOne = async(connection, req, res) => {
    await projetos.deleteOne(connection, req.params.id)

    res.redirect('/projetos')
}

module.exports = {
    index,
    createForm,
    createProcess,
    updateForm,
    updateProcess,
    deleteOne
}