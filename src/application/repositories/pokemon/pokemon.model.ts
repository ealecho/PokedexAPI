import type {PokemonAbility, PokemonHeldItem, PokemonMove, PokemonPastType, PokemonSprites, PokemonStat, PokemonType, VersionGameIndex } from "pokenode-ts";
import type { PokemonId } from "../../../domain/pokemon/pokemon.id";


export interface PokemonGetByIdCondition {
    id: PokemonId;
}

export interface PokemonRepositoryDto {
    pokemon: Pokemon
}

export interface NamedAPIResource {
  /** The name of the referenced resource */
  name: string;
  /** The URL of the referenced resource */
  url: string;
}

/**
 * Pokemon information
 * Covering each item in the interface is tedious, so I am importing from pokenode-ts
 */
export interface Pokemon {
    // The identifier for the resource 
    id: number;
    // The name of this resource
    name: string;
    // The experienced gain for defeating this pokemon
    base_experience: number
    // The height the pokemon in decimeters
    height: number;
    //  set for pokemon used as the the default for each speiceies
    is_default: boolean;
    // order of sorting
    order: number;
    // the weight for the pokemon in hectograms
    weight: number;
    //  a list of abiliteis the pokemon could potentially have
    abilities: PokemonAbility[];
    // a list of forms the pokemon could portentiallly take on
    forms: NamedAPIResource[];
    // a list of game indices relevenat to the pokemon by generation
    game_indices: VersionGameIndex[];
    //a alist of items the pokemon may be holding  when encountered
    held_items: PokemonHeldItem[];
    // list of location areas, as well as encounter details pertaining to specific versions
    location_area_encouters: string;
    //  alist of moves as welll as learn methods and level details pertaining to specifi version groups
    moves: PokemonMove[];
    // a set of sprites to depict this pokemon in a game
    sprites: PokemonSprites;
    // the Species this pokemon belongs to
    species: NamedAPIResource;
    // a list of base stats or values for this pokemon
    stats: PokemonStat[];
    //  a list of details shoing the types this Pokemon has
    types: PokemonType[];
    // data for descriping a pokemon type in previous generations
    past_types: PokemonPastType[]
}