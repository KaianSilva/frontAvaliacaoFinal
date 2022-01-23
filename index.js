const usrlogado = JSON.parse(localStorage.getItem('logado'))
console.log(usrlogado)
if (usrlogado) {
    window.location.href = "recados.html"
}

function Usuario(senha,id) {
    this.senha = senha
    this.id = id
    this.mensagens = new Array()
}


function Logado(nome,id){
    this.nome = nome
    this.id = id
}

function createUser(nome,senha,id) {

    if (localStorage.getItem(nome)) {
        alert('usuario ja existe')
    } else {
        let user = new Usuario(senha,id)
        localStorage.setItem(nome,JSON.stringify(user))
        
        alert('criado')
    }

    
}



function login(nome ,senha) {
    console.log(nome)
    
    axios.post('https://back-end-avf-kaian.herokuapp.com/signin',{
            name: nome,
            pass: senha
        
    })
    .then(function (response) {
        
      console.log(response.data);
      const usuarioLogado = new Logado(response.data.name,response.data.uid)
      localStorage.setItem('logado',JSON.stringify(usuarioLogado))
      window.location.href = "recados.html"
      
    })
    .catch(function (error) {
        alert("usuario ou senha incorretos !")
      console.log(error);
    });
}

const usuario = document.querySelector('#nome')
const senha = document.querySelector('#pass')

const btnEntrar = document.querySelector('#entrar')

btnEntrar.addEventListener('click', function(event){
    event.preventDefault()
    login(usuario.value , senha.value)
})


/* CRIAR USUÁRIO */
const btnCriarUser = document.querySelector('#criarUser')
btnCriarUser.addEventListener('click',function(event){
    const modalNome = document.querySelector('#recipient-name')
    const modalPass = document.querySelector('#recipient-pass')

    axios.post('https://back-end-avf-kaian.herokuapp.com/signup',{
            name: modalNome.value,
            pass: modalPass.value
        
    })
    .then(function (response) {
        
      console.log(response.data);
      alert('criado')
      
    })
    .catch(function (error) {
      console.log(error);
    });

   

})

function logado(usuario,id) {
    
    const usuarioLogado = new Logado(usuario,id)
    console.log(usuarioLogado)
    localStorage.setItem('logado',JSON.stringify(usuarioLogado))

}