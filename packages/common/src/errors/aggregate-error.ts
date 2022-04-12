export class AggregateError extends Error
{
    errors:Array<Error>;

    constructor(errors:Array<Error>, message?:string) {
        let msg = (message ?? 'An aggregate error has occurred') + ':\n\n';
        errors.forEach(e => msg += e.toString() + '\n\n');
        super(msg);

        this.errors = errors;
    }
} 