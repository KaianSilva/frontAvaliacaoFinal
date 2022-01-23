const logado = JSON.parse(localStorage.getItem('logado'))
console.log(logado)
if (logado == null) {
    window.location.href = "index.html"
}
console.log(`usuario logado: ${logado.nome}`)

const h1 = document.querySelector('.h1')
h1.innerHTML = `Bem vindo <span class="text-success">${logado.nome.toUpperCase()}</span>`

/* CRIAR MENSAGEM */
const btnCriarMensagem = document.querySelector('#addMensagem')
btnCriarMensagem.addEventListener('click',function(event){
    const descricao = document.querySelector('#desc')
    const detalhamento = document.querySelector('#det')

    
    addMensagem(logado.id,descricao.value, detalhamento.value)

})

function addMensagem(id,desc,det) {
  
    axios.post(`https://back-end-avf-kaian.herokuapp.com/message`,{
        title: desc,
        description: det,
        user: id
        
    })
    .then(function (response) {
        
        console.log(response.data.uid);
        window.location.href = "recados.html"
      })
      .catch(function (error) {
        console.log(error);
      });


}



function mostrarTabela(id) {
    const table = document.querySelector('#corpo')
    
    axios.get(`https://back-end-avf-kaian.herokuapp.com/message/user/${id}`,{
            
    })
    .then(function (response) {
        
        console.log(response.data)

    table.innerHTML = ""

    for (let i = 0; i < response.data.length; i++) {
        table.innerHTML += 
        `<tr>` +
              `<th id="linha" scope="row">${i}</th>`+
              `<td>${response.data[i].title}</td>`+
              `<td>${response.data[i].description}</td>`+
              `<td> <button onclick="editarItem('${response.data[i].uid}')" id="edit" type="button" class=" btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" >Editar</button> <button onclick="removerItem('${response.data[i].uid}')" type="button" class="deletar btn btn-danger btn-sm">Deletar</button> </td>`+
        '</tr>'
        
    }

    })
    .catch(function (error) {
    console.log(error);
    });
    
    

}

mostrarTabela(logado.id)



/* EXCLUIR  MENSAGEM */
function removerItem(uid) {
    
    axios.delete(`https://back-end-avf-kaian.herokuapp.com/message/${uid}`,{
            
    })
    .then(function (response) {
    console.log(response)
    window.location.href = "recados.html"
    })
    .catch(function (error) {
    console.log(error);
    });

    

}



/* EDITAR  MENSAGEM */

function editarItem(uid) {
    
    console.log('vai editar')

    let desc = document.querySelector('#recipient-desc')
    let det = document.querySelector('#recipient-det')
    const btnSalvar = document.querySelector('#editado')

    

    axios.get(`https://back-end-avf-kaian.herokuapp.com/message/${uid}`,{
            
    })
    .then(function (response) {
    console.log(response.data)

    desc.value = response.data.title
    det.value = response.data.description

    btnSalvar.addEventListener('click',function(event){

        axios.put(`https://back-end-avf-kaian.herokuapp.com/message/${uid}`,{
            title: desc.value,
	        description: det.value
           
    })
    .then(function (response) {
        console.log(response)
        window.location.href = "recados.html"
        })
        .catch(function (error) {
        console.log(error);
        });

       
    })

    })
    .catch(function (error) {
    console.log(error);
    });


    
}

/* SAIR DO SISTEMA */
function logout() {
    
    localStorage.removeItem('logado')

    window.location.href = "index.html"

}

