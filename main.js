'use strict'

/***************************************************JS-DEVILDRUITS********************************************************/

async function searchFruits(name) { 
    if (!name.trim()) {
        alert('Não mande um nome vazio!')
        return []
    }

    const url = `https://api.api-onepiece.com/v2/fruits/en`
    const response = await fetch(url)
    const data = await response.json()

    const fruitList = []
    const lowerCaseName = name.toLowerCase()

    data.forEach(function (item) {
        if (
            (item.roman_name && item.roman_name.toLowerCase().includes(lowerCaseName)) ||
            (item.name && item.name.toLowerCase().includes(lowerCaseName)) ||
            (item.type && item.type.toLowerCase() == lowerCaseName)
        ) {
            fruitList.push(item)
        }
    })

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


/*****************************************JS-CHARACTERS**********************************************/

async function searchCharacters(query) {
    if (!query.trim()) {
        alert('Não mande um nome vazio!')
        return []
    }

    const urlC = `https://api.api-onepiece.com/v2/characters/en`
    const responseC = await fetch(urlC)
    const dataC = await responseC.json()

    const characterList = []
    const name = query.toLowerCase()

    dataC.forEach(function (item) {

        const characterName = item.name.toLowerCase()
        
        if (characterName.includes(name)) {
            characterList.push(item)
        }
    })

    return characterList
}

async function fillCharacters() {

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

        if(item.bounty.length >= 1){
            const berry = document.createElement('img')
            berry.src = './img/berry.png'
            divBounty.appendChild(berry)
        }
        
        const characterBounty = document.createElement('span')
        characterBounty.textContent = item.bounty

        
        characterCard.appendChild(wantedImg)
        characterCard.appendChild(nameElement)
        
        divBounty.appendChild(characterBounty)
        characterCard.appendChild(divBounty)
        charactersGallery.appendChild(characterCard)
        
        characterCard.addEventListener('click', function() {
            characterInfo(item)
        })
    })
}

function characterInfo(item) {
    const charactersGallery = document.getElementById('characters-gallery')
    charactersGallery.replaceChildren()

    const characterPoster = document.createElement('div')
    characterPoster.classList.add('chosen-character')
    characterPoster.replaceChildren()

    const leftDecor = document.createElement('div')
    leftDecor.id = 'left-decor'
    const decorImg1 = document.createElement('img')
    decorImg1.src = './img/decoracao.png'
    leftDecor.appendChild(decorImg1)

    const divContent = document.createElement('div')
    divContent.className = 'div-content'

    const nameTraits = document.createElement('div')
    nameTraits.className = 'name-traits'

    const name = document.createElement('h2')
    name.textContent = item.name

    const traits = document.createElement('div')
    traits.className = 'traits'

    const sizeDiv = document.createElement('div')
    sizeDiv.className = 'size-box'
    const sizeText = document.createElement('p')
    sizeText.textContent = 'Size:'
    const size = document.createElement('p')
    size.textContent = item.size

    const ageDiv = document.createElement('div')
    ageDiv.className = 'age-box'
    const ageText = document.createElement('p')
    ageText.textContent = 'Age:'
    const age = document.createElement('p')
    age.textContent = item.age

    const statusDiv = document.createElement('div')
    statusDiv.className = 'status-box'
    const statusText = document.createElement('p')
    statusText.textContent = 'Status:'
    const status = document.createElement('p')
    status.textContent = item.status

    let bountyDiv = null
    if (item.bounty) {
        bountyDiv = document.createElement('div')
        bountyDiv.className = 'box-bounty'
        const bountyText = document.createElement('p')
        bountyText.textContent = 'Bounty:'
        bountyText.className = 'attribute-text'
        const bounty = document.createElement('p')
        bounty.textContent = item.bounty

        bountyDiv.appendChild(bountyText)
        bountyDiv.appendChild(bounty)
    }

    const groupDiv = document.createElement('div')
    groupDiv.className = 'group-box'
    const groupText = document.createElement('p')
    groupText.textContent = 'Group:'
    groupText.className = 'attribute-text'
    const group = document.createElement('p')
    group.textContent = item.crew.name

    groupDiv.appendChild(groupText)
    groupDiv.appendChild(group)

    let jobDiv = null
    if (item.job) {
        jobDiv = document.createElement('div')
        jobDiv.className = 'job-box'
        const jobText = document.createElement('p')
        jobText.textContent = 'Job:'
        jobText.className = 'attribute-text'
        const job = document.createElement('p')
        job.textContent = item.job

        jobDiv.appendChild(jobText)
        jobDiv.appendChild(job)
    }

    const rightDecor = document.createElement('div')
    rightDecor.id = 'right-decor'
    const rightImg1 = document.createElement('img')
    rightImg1.src = './img/decoracao2.png'
    rightDecor.appendChild(rightImg1)

    sizeDiv.appendChild(sizeText)
    sizeDiv.appendChild(size)
    ageDiv.appendChild(ageText)
    ageDiv.appendChild(age)
    statusDiv.appendChild(statusText)
    statusDiv.appendChild(status)
    traits.appendChild(sizeDiv)
    traits.appendChild(ageDiv)
    traits.appendChild(statusDiv)

    nameTraits.appendChild(name)
    nameTraits.appendChild(traits)

    divContent.appendChild(nameTraits)
    if (bountyDiv) divContent.appendChild(bountyDiv)
    divContent.appendChild(groupDiv)
    if (jobDiv) divContent.appendChild(jobDiv)

    characterPoster.appendChild(leftDecor)
    characterPoster.appendChild(divContent)
    characterPoster.appendChild(rightDecor)
    charactersGallery.appendChild(characterPoster)
}

/**********************************************JS-GLOBAL************************************************/

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

    if (document.getElementById('icon1')) {
        setupEvents('icon1', 'search-fruit', fillFruits)
    }

    if (document.getElementById('icon2')) {
        setupEvents('icon2', 'search-characters', fillCharacters)
    }
})