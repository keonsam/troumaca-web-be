
export class  Confirmation {
    private _confirmationId:string;
    private _credentialId:string;
    private _code:string;
    private _status:string;
    private _modifiedOn:Date;
    private _createdOn:Date;

    get confirmationId(): string {
        return this._confirmationId;
    }

    set confirmationId(value: string) {
        this._confirmationId = value;
    }

    get credentialId(): string {
        return this._credentialId;
    }

    set credentialId(value: string) {
        this._credentialId = value;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get modifiedOn(): Date {
        return this._modifiedOn;
    }

    set modifiedOn(value: Date) {
        this._modifiedOn = value;
    }

    get createdOn(): Date {
        return this._createdOn;
    }

    set createdOn(value: Date) {
        this._createdOn = value;
    }

    toJson() {
        return {
            confirmationId: this.confirmationId,
            credentialId: this.credentialId,
            code: this.code,
            status: this.status,
            createdOn: this.createdOn,
            modifiedOn: this.modifiedOn
        }
    }
}