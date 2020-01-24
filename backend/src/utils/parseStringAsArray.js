module.exports = function parseStringAsArray(arrayAsString){
    // usamos o Map para navegarmos dentro do Array de techs e usamos o trim para tirar os espaços colocados pelo usuário
    return arrayAsString.split(',').map(tech => tech.trim());
};