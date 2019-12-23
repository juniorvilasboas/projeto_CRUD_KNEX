const express = require('express')
const pessoasController = require('../controllers/pessoas')

const pessoasRouter = (dependencies) => {
    const router = express.Router()
    
    router.get('/', pessoasController.index.bind(null, dependencies))
    router.get('/create', pessoasController.createForm)
    router.post('/create', pessoasController.createProcess.bind(null, dependencies))
    router.get('/edit/:id', pessoasController.editForm.bind(null, dependencies))
    router.post('/edit/:id', pessoasController.editProcess.bind(null, dependencies))
    router.get('/delete/:id', pessoasController.deleteOne.bind(null, dependencies))

    return router
}

module.exports = pessoasRouter