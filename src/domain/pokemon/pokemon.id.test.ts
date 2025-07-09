import {describe, expect, it} from "bun:test";
import { ApplicationStatusError } from "../error";
import { PokemonId } from "./pokemon.id";


describe("PokemonId", () => {
    describe("createRequired", () => {
        it("should be able to create PokemonId with a valid pokedex number", () => {
            //Boundary test: minimum value
            const minId = PokemonId.createRequired(1);
            expect(minId.toNumber()).toBe(1);
            //Normal Value
            const normalId = PokemonId.createRequired(25);
            expect(normalId.toNumber()).toBe(25);
            //Boundary Test: maximum value
            const maxId = PokemonId.createRequired(888);
            expect(maxId.toNumber()).toBe(888)
        });
        it("should be able to throw an error for out-of-range pokedex numbers", () => {
            //Boundary test: less than minimum value
            expect(() => {
                PokemonId.createRequired(0);
            }).toThrow(ApplicationStatusError);
        });
    });
    describe("toNumber", () =>{
        it("should be able to convert to number", () => {
            const id = PokemonId.createRequired(25);
            expect(id.toNumber()).toBe(25);
        })
    })
})