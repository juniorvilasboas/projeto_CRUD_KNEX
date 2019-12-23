const formataData = require('../ultils/functions')

const getPaginationParams = query => {
    const { currentPage, pages, pageSize } = query

    return {
        currentPage : currentPage ? parseInt(currentPage) : 0,
        pages       : pages ? parseInt(pages) : 1,
        pageSize    : pageSize ? parseInt(pageSize) : 10
    }
}

const getPessoas = async({ db }, query) => {
    const pagination = getPaginationParams(query)    
    const pessoas = await db('pessoas')
                            .select('*')
                            .offset(pagination.currentPage * pagination.pageSize)
                            .limit(pagination.pageSize)

    const pessoasCount = await db('pessoas')
                            .count('* as total')
                            .first()

    pagination.total = pessoasCount.total
    pagination.totalPages = Math.ceil(pessoasCount.total / pagination.pageSize)

    return  {
        data: pessoas,
        pagination
    }
}

const getPessoaById = async({ db }, id) => {
    const pessoa = await db('pessoas')
                            .select('*')
                            .where('id', id)

    return pessoa
}

const createPessoa = async({ db }, data) => {
    data.nascimento = formataData(data.nascimento)
    
    await db('pessoas')
            .insert(data)
}

const editPessoa = async({ db }, data, id) => {
    data.nascimento = formataData(data.nascimento)

    await db('pessoas')
            .where({ id: id })
            .update(data)

}

const deletePessoa = async({ db }, id) => {
    await db('pessoas')
            .where({ id: id })
            .del()
}

module.exports = {
    getPessoas,
    getPessoaById,
    createPessoa,
    editPessoa,
    deletePessoa
}