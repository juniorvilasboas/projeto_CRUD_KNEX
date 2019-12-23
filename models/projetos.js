const getPaginationParams = query => {
    const { currentPage, pages, pageSize } = query

    return {
        currentPage : currentPage ? parseInt(currentPage) : 0,
        pages       : pages ? parseInt(pages) : 1,
        pageSize    : pageSize ? parseInt(pageSize) : 10
    }
}

const getProjetos = async({ db }, query) => {
    const pagination = getPaginationParams(query)

    /* SELECT pro.id, pro.nome, dono.nome AS dono, gerente.nome AS gerente FROM projetos AS pro
     * INNER JOIN pessoas AS dono ON dono.id = pro.dono
     * INNER JOIN pessoas AS gerente ON gerente.id = pro.gerente
    */
    const projetos = await db({ pro: 'projetos', pes_dono: 'pessoas', pes_gerente: 'pessoas' })
                            .select({ id: 'pro.id', nome: 'pro.nome', dono: 'pes_dono.nome', gerente: 'pes_gerente.nome'})
                            .whereRaw( '?? = ??', [ 'pro.dono', 'pes_dono.id' ] )
                            .whereRaw( '?? = ??', [ 'pro.gerente', 'pes_gerente.id' ] )
                            .offset(pagination.currentPage * pagination.pageSize)
                            .limit(pagination.pageSize)

    const projetosCount = await db('projetos')
                            .count('* as total')
                            .first()

    pagination.total = projetosCount.total
    pagination.totalPages = Math.ceil(projetosCount.total / pagination.pageSize)
    
    return {
        data: projetos,
        pagination
    }
}

const getProjetosById = async({ db }, id) => {
    const projeto = await db({ pro: 'projetos', pes_dono: 'pessoas', pes_gerente: 'pessoas' })
                            .select({
                                id: 'pro.id',
                                nome: 'pro.nome',
                                dono_id: 'pes_dono.id',
                                dono: 'pes_dono.nome',
                                gerente_id: 'pes_gerente.id',
                                gerente: 'pes_gerente.nome'
                            })
                            .whereRaw( '?? = ??', [ 'pro.dono', 'pes_dono.id' ] )
                            .whereRaw( '?? = ??', [ 'pro.gerente', 'pes_gerente.id' ] )
                            .where({ 'pro.id': id })

    return projeto
}

const createProjeto = async({ db }, data) => {
    await db('projetos')
            .insert(data)
}

const editProjeto = async({ db }, data, id) => {
    console.log(data)
    await db('projetos')
            .where({ id: id })
            .update(data)
}

const deleteProjeto = async({ db }, id) => {
    await db('projetos')
            .where({ id: id })
            .del()
}

module.exports = {
    getProjetos,
    getProjetosById,
    createProjeto,
    editProjeto,
    deleteProjeto
}