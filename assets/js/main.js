const mostrarMais = document.getElementById("mostrarMais")
const pokemonList = document.getElementById('pokemonList')
const limit = 15
let offset = 0

const cardPokemon= document.getElementById("cardPokemon")
const nomePokemon= document.getElementById("nomePoke")
const numPokemon= document.getElementById("numPoke")
const alturaPokemon = document.getElementById("alturaPoke")
const pesoPokemon = document.getElementById("pesoPoke")

let listaTipos = document.getElementById("listaTipos")


const maxRecords = 151

function loadPokemonItens(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.mainType}" id="${pokemon.name}" onclick=abrirPoke(${pokemon.name})>
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detalhes">
                        <ol class="tipos ">
                        ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                        
                    </div> 
                    <div class="iconsTypes">
                        ${pokemon.types.map((type) => `<img src="assets/icon/${type}.png" alt="" class="icon_type">`).join('')}
                    </div>
                    
        </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })
}

loadPokemonItens(offset, limit)

mostrarMais.addEventListener("click", () => {
    offset += limit
    const qtdRecordNextPage =offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        mostrarMais.parentElement.removeChild(mostrarMais)
    }
    else{
        loadPokemonItens(offset, limit)
    }

})


const fecharDetalhes= document.getElementById("fecharDetalhes")

fecharDetalhes.addEventListener("click", () => {
    cardPokemon.style.display="none"
    imagePoke.innerHTML = ''
    cardPokemon.classList=''
    cardPokemon.classList.add("cardPokemon")
    listaTipos.innerHTML =''
})

function abrirPoke(poke){

    const imagem = document.createElement("img")
    const imagemTipo =document.createElement("img")
    cardPokemon.style.display="flex"
    let idPokemon=0


    fetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    }).then((response) => {
        return response.json()
    }).then((pokemon) => {
        let tiposPoke = []

        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//other/official-artwork/${pokemon.id}.png`

        if(pokemon.id.toString().length<2){idPokemon = "#000"+pokemon.id.toString()}
        else if(pokemon.id.toString().length<3){idPokemon = "#00"+pokemon.id.toString()}
        else if(pokemon.id.toString().length<4){idPokemon = "#0"+pokemon.id.toString()}
        else{idPokemon = "#"+pokemon.id.toString()}
        nomePokemon.innerText = pokemon.name
        numPokemon.innerText = idPokemon
        pesoPokemon.innerText = pokemon.weight /10 +" kg"
        alturaPokemon.innerText = pokemon.height /10+" m"

        const mainType= pokemon.types[0].type.name
        cardPokemon.classList.add(mainType)
        imagePoke.appendChild(imagem)
        

        let tipos = pokemon.types
        console.log(tipos.length)

    
        for (i = 0; i < tipos.length; i++) {
            tiposPoke[i] = pokemon.types[i].type.name
            document.getElementById("listaTipos").innerHTML += `<img src="assets/icon/${tiposPoke[i]}.png" alt="" class="icon_type">`
        }
    })
}










