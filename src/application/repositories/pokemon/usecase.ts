import type { NamedAPIResource, PokemonAbility, PokemonHeldItem, PokemonMove, PokemonPastType, PokemonSprites, PokemonStat, PokemonType, VersionGameIndex } from "pokenode-ts";
import type { PokemonId } from "../../../domain/pokemon/pokemon.id";

export interface PokemonIdInputPort {
    handle(input: PokemonIdInputUseCaseDto): Promise<PokemonIdOutputUseCaseDto>;
}
export type { PokemonIdInputPort as PokemonIdInputPortType };
export interface PokemonIdInputUseCaseDto {
    // Pokemon number
    pokemonId: PokemonId;
}
export class PokemonIdOutputUseCaseDto {
    /**
    * @param Pokemon Each item is tedious, so i am importing from from pokenode-ts
    */
    constructor(
      /** The identifier for this resource */
      readonly id: number,
      /** The name for this resource */
      readonly name: string,
      /** The base experience gained for defeating this Pokémon */
      readonly base_experience: number,
      /** The height of this Pokémon in decimetres */
      readonly height: number,
      /** Set for exactly one Pokémon used as the default for each species */
      readonly is_default: boolean,
      /** Order for sorting. Almost national order, except families are grouped together */
      readonly order: number,
      /** The weight of this Pokémon in hectograms */
      readonly weight: number,
      /** A list of abilities this Pokémon could potentially have */
      readonly abilities: PokemonAbility[],
      /** A list of forms this Pokémon can take on */
      readonly forms: NamedAPIResource[],
      /** A list of game indices relevent to Pokémon item by generation */
      readonly game_indices: VersionGameIndex[],
      /** A list of items this Pokémon may be holding when encountered */
      readonly held_items: PokemonHeldItem[],
      /** A link to a list of location areas, as well as encounter details pertaining to specific versions */
      readonly location_area_encounters: string,
      /** A list of moves along with learn methods and level details pertaining to specific version groups */
      readonly moves: PokemonMove[],
      /** A set of sprites used to depict this Pokémon in the game.
       * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
       */
      readonly sprites: PokemonSprites,
      /** The species this Pokémon belongs to */
      readonly species: NamedAPIResource,
      /** A list of base stat values for this Pokémon */
      readonly stats: PokemonStat[],
      /** A list of details showing types this Pokémon has */
      readonly types: PokemonType[],
      /** Data describing a Pokemon's types in a previous generation. */
      readonly past_types: PokemonPastType[],
  ){}
}
