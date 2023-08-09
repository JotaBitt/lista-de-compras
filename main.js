let listaItens = [];
let editarItem;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');
const ulComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaItens));
}

//Retornam FALSE em JavaScript (valor omitido[Algo vazio], null, NaN, "", False, 0);

if (listaRecuperada) {
    listaItens = JSON.parse(listaRecuperada);
    mostrarItem();

} else {
    listaItens = [];
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    salvarItem();
    itensInput.focus();
});

function salvarItem() {
    const comprasItem = itensInput.value;
    const checarDuplicado = listaItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

    if (checarDuplicado) {
        alert("Esse item já existe.");

    } else {
        listaItens.push({
            valor: comprasItem,
            checar: false
        });
        mostrarItem();
    }
    itensInput.value = "";
}

function mostrarItem() {
    ulItens.innerHTML='';
    ulComprados.innerHTML = '';
    listaItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(editarItem) ? 'disabled' : ''}></input>
                </div>

                <div>
                    ${index === Number(editarItem) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
                    :'<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }
    });
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaItens[valorDoElemento].checar = evento.target.checked;
            mostrarItem();
        })
    })

    const deletarObjeto = document.querySelectorAll('.deletar');

    deletarObjeto.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaItens.splice(valorDoElemento, 1);  
            mostrarItem();
        })
    })

    const editarItens = document.querySelectorAll('.editar');

    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            editarItem = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItem();
            
        })
    })
    atualizaLocalStorage();
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${editarItem}"] input[type="text"]`);
    listaItens[editarItem].valor = itemEditado.value;
    editarItem = -1;
    mostrarItem();
}
