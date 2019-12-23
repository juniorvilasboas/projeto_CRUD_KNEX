const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

const db = require('./models/index')

const dependencies = {
    db
}

// Importando rotas
const pessoas = require('./routes/pessoas')
const projetos = require('./routes/projetos')

// Chamando as rotas
app.get('/', (req, res) => { res.render('home') })
app.use('/pessoas', pessoas(dependencies))
app.use('/projetos', projetos(dependencies))

app.listen(port, err => {
    if(!err) {
        console.log('Projeto CRUD rodando!')
    }
})