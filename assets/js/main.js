const mostrarMais = document.getElementById("mostrarMais")
const pokemonList = document.getElementById('pokemonList')
const limit = 5
let offset = 0

const maxRecords = 151

function loadPokemonItens(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.mainType}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detalhes">
                        <ol class="tipos ">
                        ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                    </div> 
                    <img src="assets/icon/${pokemon.mainType}.png" alt="" class="icon_type">
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











