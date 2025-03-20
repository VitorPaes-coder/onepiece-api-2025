'use strict'

async function pesquisarFrutas(nome) {

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
function criarImagem(carta) {
    const galeria = document.getElementById('galeria')
    const novocard= document.createElement('div')
    novocard.classList.add('card')
    const novaImg = document.createElement('img')
    novaImg.src = `https://api.codetabs.com/v1/proxy/?quest=${carta.images.small}`
    novaImg.alt = carta.name
    novaImg.id=carta.id
    novocard.appendChild(novaImg)
    galeria.appendChild(novocard)

    novaImg.addEventListener('click', async function() {
        await preencherinfo(carta.id)
    });
}

async function preencherFotos() {
    const card = document.getElementById('pokemon').value
    const fotos = await pesquisarFotos(card)
    const galeria = document.getElementById('galeria')
    galeria.replaceChildren()
    galeria.innerHTML = ''
    if (fotos && fotos.length > 0) {
        fotos.forEach(criarImagem)
    } else {
        galeria.innerHTML = '<p>Card não encontrado!</p>'
    }
}

/*************************************************/

async function pesquisarinfos(cardId) {
    
    const url = `https://api.codetabs.com/v1/proxy/?quest=https://api.pokemontcg.io/v2/cards?q=id:${cardId}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        
        return data.data[0] 
    } catch (error) {
        console.error("Erro ao buscar informações:", error)
        return null
    }
}
async function preencherinfo(cardId) {
    const infos = await pesquisarinfos(cardId)
    console.log(infos)
    galeria.innerHTML = ''
    if (infos) {
        const infoContainer = document.getElementById('info')

        // Criando a estrutura para a descrição da carta
        const descContainer = document.createElement('div')
        descContainer.classList.add('desc')

        const fotoContainer=document.createElement('div')
        fotoContainer.classList.add('fotos')

        const img = document.createElement('img');
        img.src = `https://api.codetabs.com/v1/proxy/?quest=${infos.images.small}`
        img.alt = infos.name
        fotoContainer.appendChild(img);

        infoContainer.appendChild(fotoContainer)

        // Adicionando o nome da carta
        const nome = document.createElement('p')
        nome.textContent = `${infos.name}`
        descContainer.appendChild(nome)

        const statusContainer = document.createElement('div');
        statusContainer.classList.add('status');

        // Adicionando HP
        const hp = document.createElement('p')
        hp.textContent = `HP: ${infos.hp}`
        statusContainer.appendChild(hp);

        // Adicionando Level (caso exista)
        const level = document.createElement('p')
        level.textContent = `Level: ${infos.level || 'N/A'}`
        statusContainer.appendChild(level)
    
        // Adicionando Tipos
        const tipos = document.createElement('p')
        tipos.textContent = `Tipo: ${infos.types.join(', ')}`
        statusContainer.appendChild(tipos);
        
        descContainer.appendChild(statusContainer)

        /**************************************************************/

        const ataqueContainer=document.createElement('div')
        ataqueContainer.classList.add('ataques')

        const ataques=document.createElement('div')
        ataques.classList.add('tipos')

        const ataquestitle = document.createElement('p')
        ataquestitle.textContent = `Ataques:`
        ataqueContainer.appendChild(ataquestitle)

        // Adicionando os ataques
        if (infos.attacks && infos.attacks.length > 0) {
            const ataque1 = document.createElement('p');
            ataque1.textContent = `Ataque 1: ${infos.attacks[0].name} - Dano: ${infos.attacks[0].damage}`;
            ataques.appendChild(ataque1)

            if (infos.attacks[1]) {
                const ataque2 = document.createElement('p');
                ataque2.textContent = `Ataque 2: ${infos.attacks[1].name} - Dano: ${infos.attacks[1].damage}`;
                ataques.appendChild(ataque2)
            }
        }
        ataqueContainer.appendChild(ataques)
        descContainer.appendChild(ataqueContainer)

        /**************************************************************/

        const efeitoContainer=document.createElement('div')
        efeitoContainer.classList.add('especial')
        const effect=document.createElement('div')
        effect.classList.add('efeito')

        // Adicionando o efeito do ataque
        const efeitoname = document.createElement('p');
        efeitoname.textContent = infos.abilities ? infos.abilities[0]?.name ?? '' : '';
        efeitoContainer.appendChild(efeitoname)

        const efeito = document.createElement('p');
        efeito.textContent = efeito.textContent = infos.abilities?.[0]?.text ?? 'Nenhum efeito adicional';
        effect.appendChild(efeito)

        efeitoContainer.appendChild(effect)
        descContainer.appendChild(efeitoContainer)
        
        /**************************************************************/

        const pontosContainer=document.createElement('div')
        pontosContainer.classList.add('pontos')

        // Adicionando Fraqueza
            
        const fraqueza = document.createElement('p');
        if (infos.weaknesses && infos.weaknesses[0]) {
            fraqueza.textContent = `Fraqueza: ${infos.weaknesses[0].type || 'N/A'}`;
        } else {
        fraqueza.textContent = 'Fraqueza: N/A';
        }

        // Adicionando Resistência
        const resistencia = document.createElement('p');
        resistencia.textContent = `Resistência: ${infos.types} `;
        pontosContainer.appendChild(resistencia);
        descContainer.appendChild(pontosContainer)

        /********************************************************************/

        // Adicionando Preço
        const preco = document.createElement('p');
        preco.textContent = `Preço: ${infos.cardmarket.prices.averageSellPrice || 'N/A'} USD`;
        descContainer.appendChild(preco);

        // Adicionando a estrutura de .desc ao contêiner de informações
        infoContainer.appendChild(descContainer);

    } else {
        console.log("Informações não encontradas");
    }
}

const createCharacterCard = (name, bounty) => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const wantedTitle = document.createElement("h2");
    wantedTitle.classList.add("wanted-title");
    wantedTitle.textContent = "WANTED";
    
    const characterName = document.createElement("h3");
    characterName.classList.add("character-name");
    characterName.textContent = name;

    const bountyText = document.createElement("p");
    bountyText.classList.add("character-bounty");
    bountyText.innerHTML = `DEAD OR ALIVE <br> <span class="bounty-value">${bounty}</span>`;

    card.appendChild(wantedTitle);
    card.appendChild(characterName);
    card.appendChild(bountyText);

    document.getElementById("characters-container").appendChild(card);
};

document.getElementById('pesquisar').addEventListener('click', preencherFotos)