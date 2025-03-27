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

        if (item.filename.length > 41) {
            const img = document.createElement('img')
            img.src = item.filename
            img.alt = item.name
            fruitCard.appendChild(img)
        } else {
            const img = document.createElement('img')
            img.src = './img/noImage.png'
            fruitCard.appendChild(img)
        }

        if (!item.roman_name) {
            const nameElement = document.createElement('h2')
            nameElement.textContent = item.name
            fruitCard.appendChild(nameElement)
        } else {
            const nameElement = document.createElement('h2')
            nameElement.textContent = item.roman_name
            fruitCard.appendChild(nameElement)
        }

        fruitsGallery.appendChild(fruitCard)
    })
}

function setupModal() {
    const modal = document.getElementById('chosen-fruit')
    if (!modal) return

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')

    const closeButton = document.createElement('span')
    closeButton.classList.add('close')
    closeButton.textContent = '×'

    const title = document.createElement('h2')
    title.id = 'modal-title'

    const image = document.createElement('img')
    image.id = 'modal-image'
    image.alt = 'Fruit Image'

    const description = document.createElement('p')
    description.id = 'modal-description'

    const closeBtn = document.createElement('button')
    closeBtn.classList.add('modal-close-btn')
    closeBtn.textContent = 'Close'

    closeButton.addEventListener('click', closeModal)
    closeBtn.addEventListener('click', closeModal)
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal()
        }
    })

    modalContent.appendChild(closeButton)
    modalContent.appendChild(title)
    modalContent.appendChild(image)
    modalContent.appendChild(description)
    modalContent.appendChild(closeBtn)

    modal.replaceChildren(modalContent)
}

function openFruitModal(fruit) {
    const modal = document.getElementById('chosen-fruit')

    if (!modal.firstChild) setupModal()

    document.getElementById('modal-title').textContent = fruit.roman_name || fruit.name
    document.getElementById('modal-image').src = fruit.filename.length > 41 ? fruit.filename : './img/noImage.png'
    document.getElementById('modal-description').textContent = fruit.description || "Description not found"

    modal.style.display = 'flex'
}

function closeModal() {
    const modal = document.getElementById('chosen-fruit')
    if (modal) {
        modal.style.display = 'none'
    }
}

setupModal()
document.getElementById('icon1').addEventListener('click', fillFruits)
document.getElementById('search-fruit').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        fillFruits()
    }
})

/***************************************************************************************/

async function searchCharacters(name) {
    const urlC = `https://api.api-onepiece.com/v2/characters/en`
    const responseC = await fetch(urlC)
    const dataC = await responseC.json()

    const characterList = []
    dataC.forEach(function (item) {
        if (item.name.includes(name)) {
            characterList.push(item)
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
        characterCard.id = 'character-card'

        const nameElement = document.createElement('h2')
        nameElement.textContent = item.name

        characterCard.appendChild(nameElement)
        charactersGallery.appendChild(characterCard)
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
