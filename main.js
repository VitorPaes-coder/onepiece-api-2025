'use strict'

/**
 * async function pesquisarFrutas(nome) {

    const url = `https://api.api-onepiece.com/v2/fruits/en`
    const response = await fetch(url)
    const data = await response.json()

    const listaDeFrutas = []
    data.forEach(function(item) {
        if (item.name.includes(nome)) {
            listaDeFrutas.push(item)
        }
    })
    
    return listaDeFrutas
}

async function name(params) {
    
}

function criarCardFruta (nome) {
    pesquisarFrutas()
    const galeriaFrutas = document.getElementById('fruits-galery')
    const novoCardFruta = document.createElement('div')
    
    novoPoster.src = link
    galeria.appendChild(novoPoster)

}
async function preencherPosters() {
    const titulo = document.getElementById('filme').value
    const posters = await pesquisarPosters(titulo)
    const galeria = document.getElementById('galeria')
    galeria.replaceChildren('')  
    posters.forEach(criarPoster) 
}



document.getElementById('pesquisar').addEventListener('click', preencherPosters)

function criarCards(produto) {
    const listaProdutos = document.getElementById('produtos')

    const novoCard = document.createElement('div')
    novoCard.classList.add("card")
    novoCard.dataset.tag = produto.tag

    const conteudoCard = document.createElement('div')
    conteudoCard.classList.add("conteudo")

    const buttonCard = document.createElement('button')

    
    const nomeCard = document.createElement('h2')

    const spanCard = document.createElement('span')

    const imgCard = document.createElement('img')

    const divCard = document.createElement('div')

    const spanDivCard = document.createElement('span')

    const h4DivCard = document.createElement('h4')

    const ulDivCard = document.createElement('ul')

    novoCard.appendChild(conteudoCard)
    novoCard.appendChild(buttonCard)
    
    conteudoCard.appendChild(nomeCard)
    conteudoCard.appendChild(spanCard)
    conteudoCard.appendChild(imgCard)
    conteudoCard.appendChild(divCard)
    
    divCard.appendChild(spanDivCard)
    divCard.appendChild(h4DivCard)
    divCard.appendChild(ulDivCard)

    criarTamanho(produto.tamanhos, ulDivCard)

    nomeCard.textContent = produto.nome
    spanCard.textContent = produto.descricao
    imgCard.src = `./camisetas/${produto.img}`
    spanDivCard.textContent = `R$ ${produto.preco}`
    novoCard.style = `--cor-card: #${produto.cor};`
    h4DivCard.textContent = 'Tamanho'
    buttonCard.textContent = 'Adicionar ao carrinho'

    listaProdutos.appendChild(novoCard)
}
    **/