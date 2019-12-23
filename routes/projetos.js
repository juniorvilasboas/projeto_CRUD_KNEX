const express = require('express')
const projetosController = require('../controllers/projetos')

const projetoRouter = (dependencies) => {
    const router = express.Router()

    router.get('/', projetosController.index.bind(null, dependencies))
    router.get('/create', projetosController.createForm.bind(null, dependencies))
    router.post('/create', projetosController.createProcess.bind(null, dependencies))
    router.get('/edit/:id', projetosController.editForm.bind(null, dependencies))
    router.post('/edit/:id', projetosController.editProcess.bind(null, dependencies))
    router.get('/delete/:id', projetosController.deleteOne.bind(null, dependencies))

    return router
}

module.exports = projetoRouter