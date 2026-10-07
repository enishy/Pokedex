import { Cache } from "./pokecache.js";

const baseURL = "https://pokeapi.co/api/v2";

export class PokeAPI {
  private cache: Cache;

  constructor() {
    this.cache = new Cache(5 * 60 * 1000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);

    if (cached) {
      console.log("Cache hit:", url);
      return cached;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    const data = (await response.json()) as ShallowLocations;

    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);

    if (cached) {
      console.log("Cache hit:", url);
      return cached;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data = (await response.json()) as Location;

    this.cache.add(url, data);

    return data;
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
  const url = `${baseURL}/pokemon/${name}`;

  const cached = this.cache.get<Pokemon>(url);

  if (cached) {
    console.log("Cache hit:", url);
    return cached;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
  }

  const data = (await response.json()) as Pokemon;

  this.cache.add(url, data);

  return data;
 }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
  pokemon: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};
