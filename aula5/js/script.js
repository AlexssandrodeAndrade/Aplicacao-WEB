let nome = prompt('Digite seu nome:', 'Alexssandro de Andrade')
//let foto = prompt("Cole o link da sua foto:", 'img/foto.jpg');
let foto = prompt('Cole o link da sua foto:', 'img/pasoca.jpg')

let curriculo = prompt(
  'Cole o link do seu currículo:',
  'https://drive.google.com/file/d/1YoYPPqoDcuzl43KTOGEzcGGsVEjjze0_/view?usp=drive_link',
)
let sobre = prompt(
  'Escreva um texto sobre você:',
  `Desenvolvedor Full Stack com 9 anos de experiência no ciclo completo de desenvolvimento de sistemas corporativos de alta complexidade (ERP). Possuo sólida bagagem em regras de negócio críticas, incluindo as áreas Financeira, Fiscal, Contábil e eSocial. Especialista na modernização de arquiteturas, realizando a transição de ambientes robustos em Java para stacks modernas focadas em performance e experiência do usuário utilizando PHP 8, Laravel e Vue.js 3.`,
)

document.getElementById('nome').innerText = nome
document.getElementById('foto').src = foto
document.getElementById('curriculo').href = curriculo
document.getElementById('sobre').innerText = sobre
