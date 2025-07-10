import type { PokemonGetByIdCondition, PokemonRepositoryDto } from "./pokemon.model";

export interface PokemonRepository {
  /**
  * Get Pokemon information from Pokedex number
  * @param condition
  */

  getById(condition: PokemonGetByIdCondition): Promise<PokemonRepositoryDto>; 

}