const findAll = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT pro.id, pro.nome, dono.nome AS dono, gerente.nome AS gerente FROM projetos AS pro
                        INNER JOIN pessoas AS dono ON dono.id = pro.dono_id
                        INNER JOIN pessoas AS gerente ON gerente.id = pro.gerente_id`, (err, results) => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const findById = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from projetos where id = '${id}'`, (err, results) => {
            if(err) {
                reject(err)
            } else {
                if(results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve({})
                }
            }
        })
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into projetos (nome, dono_id, gerente_id) values ('${data.nome}', '${data.dono}', '${data.gerente}')`, (err) => {
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const update = (connection, id, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`update projetos set nome='${data.nome}', dono_id='${data.dono}', gerente_id='${data.gerente}' where id='${id}'`, (err) => {
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const deleteOne = (connection, id) => {
    return new Promise((resolve,reject) => {
        connection.query(`delete from projetos where id = '${id}' limit 1`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteOne
}