import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Usage: catch <pokemon>");
    return;
  }

  const pokemonName = args[0];

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  const catchRate = 1 / pokemon.base_experience;

  if (Math.floor(Math.random() * pokemon.base_experience) > catchRate) {
    console.log(`${pokemonName} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    state.pokedex[pokemonName] = pokemon;
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
