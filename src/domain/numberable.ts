/** biome-ignore-all lint/complexity/noStaticOnlyClass: "//TOOD convert to enum lettertesting" */
import { ApplicationStatusError, Status } from "./error";

export interface Numerable {
    /* converts to a number*/
   toNumber(): number;
}

/* Conversion procession for classes that implement Numerable */
 export class  NumberableConverter {
    static toNumber(value: Numerable | undefined) {
        if (value) {
            return value.toNumber();
        }
        return undefined;
    }
    static toString(value: Numerable | undefined) {
        const num = NumberableConverter.toNumber(value);
        if (num == null) return undefined;
        return num?.toString();
    }
    static async toStringFromArray(
        values: (Numerable | undefined)[] | undefined,
        sep = ','
    ): Promise<string | undefined> {
        if (values && values.length > 0 ) {
            const rows = await Promise.all(values.map((v) => NumberableConverter.toNumber(v)));
            return rows.join(sep);
        }
        return undefined;
    }
 }


 /* Range */
 export abstract class Range {
    /** 
        @param min - Minimum
        @param max - Maximum
    */
    public constructor(protected readonly min:number, protected readonly max: number) {
        if (min> max) {
            throw new ApplicationStatusError('Maximum is less than minimum', Status.ILLEGAL_DATA);
        }
    }
    /**
     *  Is it included in the range?
     * @param value - Value
     */
    abstract isCover(value: number): boolean;
 }


 /**
  *  Range (Open interval)
  */
export class OpenRange extends Range {
    /**
     * Is it included in the range?
     * @param value - Value
     */
    isCover(value: number): boolean {
        return this.min < value && value < this.max;
    }
 }

 /**
 * Range (Right half-open interval)
 */
export class RightHalfOpenRange extends Range {
  /**
   * Is it included in the range?
   * @param value - Value
   */
  isCover(value: number): boolean {
    return this.min <= value && value < this.max;
  }
}
/**
 * Range (Left half-open interval)
 */
export class LeftHalfOpenRange extends Range {
  /**
   * Is it included in the range?
   * @param value - Value
   */
  isCover(value: number): boolean {
    return this.min < value && value <= this.max;
  }
}

/**
 * Range (Closed interval)
 */
export class ClosedRange extends Range {
  /**
   * Is it included in the range?
   * @param value - Value
   */
  isCover(value: number): boolean {
    return this.min <= value && value <= this.max;
  }
}
/**
 * Arguments for formatting a number
 */
export interface NumberFormatArgs {
  /**
   * Divide value by 10 to the Nth power
   */
  pow?: number;
  /**
   * Maximum number of digits to use for the fractional part
   */
  maximumFractionDigits?: number;
  /**
   * Minimum number of digits to use for the fractional part
   */
  minimumFractionDigits?: number;
  /**
   * If the fractional part is larger than maxDecimal,
   *   true:  Dynamically increase the number of displayed digits
   *   false: Fix the number of displayed digits according to maxDecimal
   */
  isDynamicIncreasedDigit?: boolean;
  /**
   * Unit: Appends a string to the end
   */
  unit?: string;
  /**
   * Whether to truncate the decimal point of the input value
   */
  isFloorRawValue?: boolean;
}

/**
 * Formats a number
 */
export class NumberFormat {
  /**
   * Divide value by 10 to the Nth power
   */
  private readonly pow: number;
  /**
   * Maximum number of digits to use for the fractional part
   */
  private readonly maximumFractionDigits?: number;
  /**
   * Minimum number of digits to use for the fractional part
   */
  private readonly minimumFractionDigits: number;
  /**
   * Unit: Appends a string to the end
   */
  private readonly unit: string;
  /**
   * Whether to truncate the decimal point of the input value
   */
  private readonly isFloorRawValue: boolean;
  /**
   * If the fractional part is larger than maximumFractionDigits,
   *   true:  Dynamically increase the number of displayed digits
   *   false: Fix the number of displayed digits according to maxDecimal
   */
  private readonly isDynamicIncreasedDigit: boolean;
  /**
   * @param args - Arguments
   */
  public constructor(args?: NumberFormatArgs) {
    this.pow = args?.pow ?? 0;
    this.maximumFractionDigits = args?.maximumFractionDigits;
    this.minimumFractionDigits = args?.minimumFractionDigits ?? 0;
    this.isDynamicIncreasedDigit = args?.isDynamicIncreasedDigit ?? true;
    this.unit = args?.unit ?? '';
    this.isFloorRawValue = args?.isFloorRawValue ?? false;
  }
  /**
   * Formats
   * @param value - Number
   */
  format(value: number): string {
    let rawValue = value;
    if (this.isFloorRawValue) {
      rawValue = Math.floor(rawValue);
    }
    const divided = rawValue / 10 ** this.pow;
    // Calculate the length of the fractional part in advance
    const fractionDigits = this.getFractionDigits(divided);
    let maximumFractionDigits = this.maximumFractionDigits;
    const minimumFractionDigits = this.minimumFractionDigits;
    // When there is a fractional part
    if (fractionDigits && fractionDigits > 0) {
      // If the maximum number of digits to use for the fractional part is not specified, display the entire fractional part
      if (maximumFractionDigits === undefined) {
        maximumFractionDigits = fractionDigits;
        // If the number of digits in the fractional part of the number to be handled is larger than the maximum number of digits to use for the fractional part, and bool is specified, display the entire fractional part
      } else if (this.isDynamicIncreasedDigit && fractionDigits > maximumFractionDigits) {
        maximumFractionDigits = fractionDigits;
      }
    }
    const initFormat = {
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    };
    const formatted = new Intl.NumberFormat('ja', initFormat).format(divided);
    return `${formatted}${this.unit}`;
  }
    /**
   * Returns the length of the fractional part
   * @param value - Number
   */
  private getFractionDigits(value: number) {
    const numericStrings = String(value).split('.');
    if (numericStrings.length >= 2) {
      return numericStrings[1]?.length;
    }
    return 0;
  }
}