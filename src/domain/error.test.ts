import {describe, expect, it} from "bun:test";
import { ApplicationConfigurationError, ApplicationStatusError, Status } from "./error";

describe("Error", () => {
    describe("Status", () => {
        it("should return the correct message", () => {
            expect(Status.SUCCESS.toMessage()).toBe("Success");
            expect(Status.NOT_FOUND.toMessage()).toBe("Not Found");
            expect(Status.BFF_SYSTEM_ERROR.toMessage()).toBe("BFF System Error");
            expect(Status.ILLEGAL_DATA.toMessage()).toBe("Ilegal Data");
        });
    });

    describe("ApplicationConfigurationError", () =>{
        it("should generate the correct error message", () => {
            const error = new ApplicationConfigurationError("Missing env var");
            expect(error.message).toBe("BFF Configuration Error Missing env var");
        });
    });

    describe("ApplicationStatusError", () => {
    it("Should generate the correct error mesage", () => {
        const error = new ApplicationStatusError("Invalid data", Status.ILLEGAL_DATA);
        expect(error.message).toBe("BFF Application Status Error status: Ilegal Data message: Invalid data")
    })
    });
});

