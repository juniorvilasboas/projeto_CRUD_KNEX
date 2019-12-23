const pessoas = require('../models/pessoas')
const moment = require('moment')

const index = async(dependencies, req, res) => {
    const pessoa = await pessoas.getPessoas(dependencies, req.query)

    res.render('pessoas/index', {
        pessoa,
        moment
    })
}

const createForm = async(req, res) => {

    res.render('pessoas/create')
}

const createProcess = async(dependencies, req, res) => {
    await pessoas.createPessoa(dependencies, req.body)

    res.redirect('/pessoas')
}

const editForm = async(dependencies, req, res) => {
    const pessoa = await pessoas.getPessoaById(dependencies, req.params.id)

    res.render('pessoas/edit', {
        pessoa,
        moment
    })
}

const editProcess = async(dependencies, req, res) => {
    await pessoas.editPessoa(dependencies, req.body, req.params.id)

    res.redirect('/pessoas')
}

const deleteOne = async(dependencies, req, res) => {
    await pessoas.deletePessoa(dependencies, req.params.id)
    
    res.redirect('/pessoas')
}

module.exports = {
    index,
    createForm,
    createProcess,
    editForm,
    editProcess,
    deleteOne
}