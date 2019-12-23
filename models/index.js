const db = require('knex')({
    client      : 'mysql2',
    connection  : {
        host        : '127.0.0.1',
        user        : 'root',
        password    : '',
        database    : 'cadastro-knex'
    }
})

db.on('query', query => {
    console.log('SQL: '+query.sql)
})

module.exports = db