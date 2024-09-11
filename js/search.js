function PesquisarFiltro(){
    var input,
    ul,
    li,
    h,
    i,
    itemName,
    txtValue,
    count = 0

    input = document.getElementById('search');
    ul = document.getElementById('listaVagas');

    filter = input.value.toUpperCase();

    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++){
        
        h = li[i].getElementsByTagName("h6")[0];

        txtValue = h.textContent || h.innerText;

        if(txtValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
            count++;
            
            itemName = li[i].querySelector(".item-name")
            if(itemName){
                itemName.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match)=>{
                    return "<strong>" + match + "</strong>";
                })
            }
        }else{
            li[i].style.display="none"
        }
    }
}


// filtrar pela opc


function filtrar() {
    var cidadeSelect = document.getElementById("cidade");
    var selectedCidade = cidadeSelect.value;
    var funcaoSelect = document.getElementById("funcao");
    var selectedFuncao = funcaoSelect.value;

    var vagas = document.querySelectorAll("#listaVagas .vagas");

    vagas.forEach(function(vaga) {
        var vagaCidade = vaga.getAttribute("data-cidade");
        var vagaFuncao = vaga.getAttribute("data-funcao");

        // Verifica se a vaga corresponde tanto à cidade quanto à função selecionadas
        if ((selectedCidade == "0" || vagaCidade == selectedCidade) &&
            (selectedFuncao == "0" || vagaFuncao == selectedFuncao)) {
            vaga.classList.add("show");
        } else {
            vaga.classList.remove("show");
        }
    });
}
// Inicializa o filtro ao carregar a página
window.onload = function() {
    filtrar();
}