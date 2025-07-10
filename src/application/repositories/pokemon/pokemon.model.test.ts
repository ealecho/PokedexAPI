import {describe, expect, it} from "bun:test";
import { PokemonId } from "../../../domain/pokemon/pokemon.id";
import type { PokemonGetByIdCondition } from "./pokemon.model";


describe("PokemonRepository Models", () => {
    describe("PokemonGetIdCondition", () => {
        it("should be able to create a correct condition object", () =>{
            const pokemonId = PokemonId.createRequired(25);
            const condition: PokemonGetByIdCondition = {
                id: pokemonId
            };
            expect(condition.id).toBe(pokemonId);
            expect(condition.id.toNumber()).toBe(25);
        });
    });
});
