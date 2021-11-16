var itemSalvosLS = localStorage;
var numeroDeItens = itemSalvosLS.getItem("numItens");
if (numeroDeItens == null){
    itemSalvosLS.setItem("numItens", 0);
    numeroDeItens= itemSalvosLS.getItem("numItens");
}

var elementoLista = document.getElementsByTagName("ul")[0];

recuperaItensLS();

function adicionaTarefa(){
    var tarefa = document.getElementById("inputTarefas").value;
    if(tarefa == ""){
        alert("Campo obrigatorio. Escreva uma tarefa!")
    }
    else{
        var el = criaNovoElemento(tarefa, false);
        var elementoLista = document.getElementsByTagName("ul")[0];
        elementoLista.appendChild(el);
        salvarLS();
        checaValidacao();
        document.getElementById("inputTarefas").value = "";
    }
}

function criaNovoElemento(texto, status){
    let novoItem = document.createElement("li");
    let tamanhoDaLista = document.getElementsByClassName("itensDaLista").length;
    let novoId = "item"+tamanhoDaLista;

    novoItem.setAttribute("class", "itensDaLista");
    novoItem.setAttribute("id",novoId);

    let checkboxItem = document.createElement("input");
    checkboxItem.setAttribute("type","checkbox");
    checkboxItem.setAttribute("class", "checkbox");
    let checkboxName = "cbox"+tamanhoDaLista;
    checkboxItem.setAttribute("name",checkboxName);
    checkboxItem.checked = status;
    checkboxItem.setAttribute("onclick","checaValidacao()");
    novoItem.appendChild(checkboxItem);
    
    let labelItem = document.createElement("label");
    labelItem.textContent = texto;
    let labelName = "lb"+tamanhoDaLista;
    labelItem.setAttribute("id",labelName);
    novoItem.appendChild(labelItem);

    
    let botaoExluir = document.createElement("button");
    botaoExluir.setAttribute("type", "submit");
    botaoExluir.setAttribute("data-ref", novoId);
    botaoExluir.setAttribute("onclick", "removeItem(this.name)");
    let buttonName = "bt"+tamanhoDaLista;
    botaoExluir.setAttribute("name",buttonName);
    let iconLixeira = document.createElement("span");
    iconLixeira.setAttribute("class","fa fa-trash");
    novoItem.appendChild(botaoExluir);
    botaoExluir.appendChild(iconLixeira);


    return novoItem;
}

function removeItem(botaoId){
    let identidade = botaoId.split("bt");
    let idItem = "item"+identidade[1];
    document.getElementById(idItem).remove();
    localStorage.clear();
    salvarLS();
    //reorganizaItens();

}



function salvarLS(){
    var dadosItens = {};
    var listaItens = document.getElementsByClassName("itensDaLista");
    var numeroDeItens = listaItens.length;
    for (var i=0; i < listaItens.length; i++){

        dadosItens[listaItens[i].childNodes[1].textContent] =  {
            tarefaCadastrada : listaItens[i].childNodes[1].textContent,
            statusTarefa : listaItens[i].childNodes[0].checked,
            ordemItem : listaItens[i].style.order
        }
    }
    itemSalvosLS.setItem("numItens", numeroDeItens);
    itemSalvosLS.setItem("dadosSessao",JSON.stringify(dadosItens));
}

function recuperaItensLS(){
    var temElNaLista = document.getElementsByClassName("itensDaLista");
    if (temElNaLista.length != numeroDeItens){
        var listaItensRecup = JSON.parse(itemSalvosLS.getItem('dadosSessao'));
       
        for (var itens in listaItensRecup){
            let el = criaNovoElemento(listaItensRecup[itens]["tarefaCadastrada"], listaItensRecup[itens]["statusTarefa"]);
            elementoLista.appendChild(el);           
        }
    }
    checaValidacao();
}

checaValidacao();
function checaValidacao(){
    var listaValid =[];
    listaValid = document.getElementsByClassName("checkbox");
    for (let i of listaValid){
        if (i.checked == true){
            let checkboxId = i.name;
            let labelAtual = "lb"+checkboxId.split("cbox")[1];
            document.getElementById(labelAtual).style.textDecoration = "line-through";
            let itemId = "item"+checkboxId.split("cbox")[1];
            document.getElementById(itemId).style.order = "1";           
        }
        else if (i.checked == false){
            let checkboxId = i.name;
            let labelAtual = "lb"+checkboxId.split("cbox")[1];
            document.getElementById(labelAtual).style.textDecoration = "none";
            let itemId = "item"+checkboxId.split("cbox")[1];
            document.getElementById(itemId).style.order = "-1";           
        }
    }
    salvarLS();

}

function reorganizaItens(){
    var temElNaLista = document.getElementsByClassName("itensDaLista");
    if (temElNaLista.length != numeroDeItens){
        for(var i = temElNaLista.length - 1; i >= 0; i--){
            temElNaLista[i].remove()
        }
        recuperaItensLS();
    
    }

}

