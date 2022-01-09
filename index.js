function Usuario(senha,id) {
    this.senha = senha
    this.id = id
    this.mensagens = new Array()
}

/* function Mensagens(descricao,detalhes) {
    this.descricao = descricao
    this.detalhes = detalhes
} */

function Logado(nome,senha){
    this.nome = nome
    this.senha = senha
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
    const user = JSON.parse(localStorage.getItem(nome))

    if (user) {
        if (user.senha == senha) {
            console.log('usuario logado')
            
            logado(nome,senha)
            window.location.href = "recados.html"
        }else{
            alert('senha errada')
        }

    }else{
       alert('usuario n existe')
    }
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

    axios.post('https://back-end-avf-kaian.herokuapp.com/user',{
            name: modalNome.value,
            pass: modalPass.value
        
    })
    .then(function (response) {
        
      console.log(response.data);
      createUser(modalNome.value, modalPass.value,response.data.uid)
    })
    .catch(function (error) {
      console.log(error);
    });

   

})

function logado(usuario,senha) {
    
    const usuarioLogado = new Logado(usuario,senha)
    console.log(usuarioLogado)
    localStorage.setItem('logado',JSON.stringify(usuarioLogado))

}