
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.mainType}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detalhes">
                    <ol class="tipos">
                    ${pokemon.types.map((type) => `<li class="tipo">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div> 
    </li>
    `
}

const pokemonList = document.getElementById('pokemonList')


pokeApi.getPokemons(0, 100).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})












