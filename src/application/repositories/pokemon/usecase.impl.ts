
import { PokemonIdOutputUseCaseDto, type PokemonIdInputPort, type PokemonIdInputUseCaseDto } from './usecase';
import { REPOSITORY_BINDINGS } from '../../../keys';
import type { PokemonRepository } from './pokemon';
import {injectable, inject} from 'inversify';

@injectable()
export class PokemonIdUseCase implements PokemonIdInputPort {
    constructor(
        @inject(REPOSITORY_BINDINGS.Pokemon) private pokemonRepository: PokemonRepository) {}
    async handle(input: PokemonIdInputUseCaseDto): Promise<PokemonIdOutputUseCaseDto> {
        const pokemonIdInterator = new PokemonIdInteractor(this.pokemonRepository);
        const pokemon = await pokemonIdInterator.handle(input);
        return pokemon;
    }
}
/**
* Interactor that transfers Pokemon information acquisatioon processing
*/
export class PokemonIdInteractor {
    constructor(
        private pokemonRepository: PokemonRepository
    ) {}
async handle(input: PokemonIdInputUseCaseDto): Promise<PokemonIdOutputUseCaseDto>{
    const pokemon = await this.pokemonRepository.getById({id: input.pokemonId});
    return new PokemonIdOutputUseCaseDto(
        pokemon.pokemon.id,
        pokemon.pokemon.name,
        pokemon.pokemon.base_experience,
        pokemon.pokemon.height,
        pokemon.pokemon.is_default,
        pokemon.pokemon.order,
        pokemon.pokemon.weight,
        pokemon.pokemon.abilities,
        pokemon.pokemon.forms,
        pokemon.pokemon.game_indices,
        pokemon.pokemon.held_items,
        pokemon.pokemon.location_area_encounters,
        pokemon.pokemon.moves,
        pokemon.pokemon.sprites,
        pokemon.pokemon.species,
        pokemon.pokemon.stats,
        pokemon.pokemon.types,
        pokemon.pokemon.past_types,
    );
}
}
