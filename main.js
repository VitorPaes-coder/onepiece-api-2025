'use strict'

async function pesquisarFrutas(nome) {
    const url = `https://api.api-onepiece.com/v2/fruits/en`
    const response = await fetch(url)
    const data = await response.json()

    const listaDeFrutas = []
    data.forEach(function (item) {
        if ((item.roman_name && item.roman_name.includes(nome)) || 
            (item.name && item.name.includes(nome))) {
            listaDeFrutas.push(item)
        }
    })

    console.log(listaDeFrutas) 
    return listaDeFrutas
}

async function preencherFrutas() {
    const fruta = document.getElementById('search-fruit').value
    const buscaFruta = await pesquisarFrutas(fruta)
    const galeriaFrutas = document.getElementById('fruits-gallery')

    galeriaFrutas.replaceChildren() 

    buscaFruta.forEach(function (item) {

        const fruitCard = document.createElement('div')
        fruitCard.classList.add('fruit-card')

        if (item.filename.length > 41) {
            const img = document.createElement('img')
            img.src = item.filename
            img.alt = item.name
            fruitCard.appendChild(img)
        }else{
            //console.log(`Images for ${item.name} haven't been found`);
            const img = document.createElement('img')
            img.src = './img/noImage.png'
            fruitCard.appendChild(img)
        }

        const nome = document.createElement('h2')
        nome.textContent = item.roman_name

        fruitCard.appendChild(nome)
        galeriaFrutas.appendChild(fruitCard)
    })
}

document.getElementById('icon1').addEventListener('click', preencherFrutas)

/***************************************************************************************/

async function pesquisarPersonagens(nome) {
    const url = `https://api.api-onepiece.com/v2/characters/en`
    const response = await fetch(url)
    const data = await response.json()

    const listaDePersonagens = []
    data.forEach(function (item) {
        if (item.name.includes(nome)) {
            listaDePersonagens.push(item)
        }
    })

    console.log(listaDePersonagens) 
    return listaDePersonagens
}

async function preencherPersonagens() {
    const personagem = document.getElementById('search-characters').value
    const buscaPersonagem = await pesquisarPersonagens(personagem)
    const galeriaPersonagens = document.getElementById('characters-gallery')

    galeriaPersonagens.replaceChildren() 

    buscaPersonagem.forEach(function (item) {

        const characterCard = document.createElement('div')
        characterCard.id='character-card'

        const nome = document.createElement('h2')
        nome.textContent = item.name

        characterCard.appendChild(nome)
        galeriaPersonagens.appendChild(characterCard)
    })
}

document.getElementById('icon2').addEventListener('click', preencherPersonagens)