'use strict'

console.log('main.js successfully loaded')

async function searchFruits(name) { 
    const url = `https://api.api-onepiece.com/v2/fruits/en`
    const response = await fetch(url)
    const data = await response.json()

    const fruitList = []
    data.forEach(function (item) {
        if ((item.roman_name && item.roman_name.includes(name)) || 
            (item.name && item.name.includes(name))) {
            fruitList.push(item)
        }
    })

    console.log(fruitList)
    return fruitList
}

async function fillFruits() {
    const fruit = document.getElementById('search-fruit').value
    const searchFruit = await searchFruits(fruit)
    const fruitsGallery = document.getElementById('fruits-gallery')

    fruitsGallery.replaceChildren()

    searchFruit.forEach(function (item) {

        const fruitCard = document.createElement('div')
        fruitCard.classList.add('fruit-card')

        const img = document.createElement('img')
        img.src = item.filename.length > 41 ? item.filename : './img/noImage.png'
        img.alt = item.name
        fruitCard.appendChild(img)

        const nameElement = document.createElement('h2')
        nameElement.textContent = item.roman_name || item.name
        fruitCard.appendChild(nameElement)

        fruitCard.addEventListener('click', function() {
            fruitInfo(item)
        })

        fruitsGallery.appendChild(fruitCard)
    })
}

function fruitInfo(item) {
    const fruitsGallery = document.getElementById('fruits-gallery')
    fruitsGallery.replaceChildren()

    const fruitDetail = document.createElement('div')
    fruitDetail.classList.add('chosen-fruit')
    fruitDetail.replaceChildren()

    const divImg = document.createElement('div')
    divImg.className = 'div-img'
    const divInfo = document.createElement('div')
    divInfo.className = 'fruit-info'

    const img = document.createElement('img')
    img.src = item.filename.length > 41 ? item.filename : './img/noImage.png'
    img.alt = item.name || 'Unknown Fruit'

    const title = document.createElement('h2')
    title.textContent = item.roman_name || item.name

    const description = document.createElement('p')
    description.className = 'fruit-description'
    description.textContent = item.description 

    const fruitType = document.createElement('div')
    fruitType.className = 'fruit-type'
    const typeText = document.createElement('p')
    typeText.textContent = 'Type:  '
    const type = document.createElement('p')
    type.textContent = item.type
    
    divImg.appendChild(img)
    fruitDetail.appendChild(divImg)

    divInfo.appendChild(title)
    divInfo.appendChild(description)
    fruitType.appendChild(typeText)
    fruitType.appendChild(type)
    divInfo.appendChild(fruitType)
    fruitDetail.appendChild(divInfo)

    fruitsGallery.appendChild(fruitDetail)
}


/***************************************************************************************/

async function searchCharacters(name) {
    const urlC = `https://api.api-onepiece.com/v2/characters/en`
    const responseC = await fetch(urlC)
    const dataC = await responseC.json()

    const characterList = []
    dataC.forEach(function (item) {
        if (item.name.includes(name)) {
            characterList.push(item)

            console.log(item);
        }
    })

    console.log(characterList)
    
    return characterList
}

async function fillCharacters() {

    console.log('fillCharacters function called')
    const character = document.getElementById('search-characters').value
    const searchCharacter = await searchCharacters(character)
    const charactersGallery = document.getElementById('characters-gallery')

    charactersGallery.replaceChildren()

    searchCharacter.forEach(function (item) {

        const characterCard = document.createElement('div')
        characterCard.classList.add('character-card')

        const wantedImg = document.createElement('img')
        wantedImg.src = './img/wanted.png'

        const nameElement = document.createElement('h2')
        nameElement.textContent = item.name

        const divBounty = document.createElement('div')
        divBounty.classList.add('bounty-box')

        const berry = document.createElement('img')
        berry.src = './img/berry.png'
        
        const characterBounty = document.createElement('span')
        characterBounty.textContent = item.bounty

        
        characterCard.appendChild(wantedImg)
        characterCard.appendChild(nameElement)
        divBounty.appendChild(berry)
        divBounty.appendChild(characterBounty)
        characterCard.appendChild(divBounty)
        charactersGallery.appendChild(characterCard)
        
        console.log(item);
        
    })
}

function setupEvents(buttonId, inputId, callback) {
    const button = document.getElementById(buttonId)
    const input = document.getElementById(inputId)

    if (button) {
        button.addEventListener('click', callback)
    }

    if (input) {
        input.addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
                callback()
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed')

    if (document.getElementById('icon1')) {
        console.log('Fruits page detected')
        setupEvents('icon1', 'search-fruit', fillFruits)
    }

    if (document.getElementById('icon2')) {
        console.log('Characters page detected')
        setupEvents('icon2', 'search-characters', fillCharacters)
    }
})
