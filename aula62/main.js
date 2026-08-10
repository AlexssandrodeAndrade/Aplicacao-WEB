const bcrypt = require('bcryptjs');
async function gerarHash(palavra) {
    const hash = await bcrypt.hash(palavra, 10);
    return hash;
}
async function comparaHash(palavra, hash) {
    const senhaCorreta = await bcrypt.compare(palavra, hash);
    return senhaCorreta;
}
async function main(criar, comparar) {
    let hash = await gerarHash(criar);
    console.log('Hash:', hash);
    let resultado = await comparaHash(comparar, hash);
    console.log('Senha correta:', resultado);
}
main('12345', '12345');
