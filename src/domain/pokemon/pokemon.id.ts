import { ApplicationStatusError, Status } from "../error";
import { ClosedRange, type Numerable } from "../numberable";

export class PokemonId implements Numerable {
    public static readonly RANGE = new ClosedRange(1, 888);
    /**
     * @param value Podex number
     */
    private constructor(private readonly value: number) {}
    /**
     * @param value Podex number
     */
    static createRequired(value: number): PokemonId {
        if (!PokemonId.RANGE.isCover(value)){
            throw new ApplicationStatusError(`Invalid PokemonId: ${value}`, Status.ILLEGAL_DATA);
        }
        return new PokemonId(value);
    }
    /**
     * @param value Podex number
     */
    toNumber(): number {
        return this.value;
    }
}