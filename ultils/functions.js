module.exports = (data) => {
    let dia = data.split('/')[0]
    let mes = data.split('/')[1]
    let ano = data.split('/')[2]
  
    return ano+'-'+mes+'-'+dia
}