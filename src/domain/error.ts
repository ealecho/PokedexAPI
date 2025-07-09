export class Status {
    private constructor(private readonly code: number, private readonly message: string) {}
    /* Success (Without issues) */
    public static readonly SUCCESS = new Status(1, 'Success');
    /* Data not found (Without Issues) */
    public static readonly NOT_FOUND = new Status(2, 'Not Found');
    /* Error caused by BFF (Exception) */
    public static readonly BFF_SYSTEM_ERROR = new Status(3, 'BFF System Error');
    /* Data that should not be in the value object, etc, has been entered */
    public static readonly ILLEGAL_DATA = new Status(4, 'Ilegal Data');

   /*  converts to message */
    toMessage():string {
        return this.message
    }
}

export abstract class ApplicationError extends Error {
    protected constructor(_message: string, public override readonly stack?: string) {
        super(_message)
    }
}

 /*  The information required at startup, such as environment variable, is not set */
 export class ApplicationConfigurationError extends ApplicationError {
    public constructor(message:string, stack?: string) {
        super(`BFF Configuration Error ${message}`, stack);
    }
 }

/* An abnormallity exists in the upstream system, etc., and the process cannot be continued */
 export class ApplicationStatusError extends ApplicationError {
    public constructor(message: string, status: Status, stack?: string) {
        super(`BFF Application Status Error status: ${status.toMessage()} message: ${message}`, stack);
    }
 }
