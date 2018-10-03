export class  ValidSession {
    private _valid: boolean;
    private _partyId: string;

    get valid(): boolean {
        return this._valid;
    }

    set valid(value: boolean) {
        this._valid = value;
    }

    get partyId(): string {
        return this._partyId;
    }

    set partyId(value: string) {
        this._partyId = value;
    }
}