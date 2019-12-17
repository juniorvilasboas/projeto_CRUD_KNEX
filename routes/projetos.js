const express = require('express')
const projetosControllers = require('../controllers/projetos')

const projetosRouter = ({ connection }) => {
    const router = express.Router()

    router.get('/', projetosControllers.index.bind(null, connection))
    router.get('/create', projetosControllers.createForm.bind(null, connection))
    router.post('/create', projetosControllers.createProcess.bind(null, connection))
    router.get('/update/:id', projetosControllers.updateForm.bind(null, connection))
    router.post('/update/:id', projetosControllers.updateProcess.bind(null, connection))
    router.get('/delete/:id', projetosControllers.deleteOne.bind(null, connection))

    return router
}

module.exports = projetosRouter