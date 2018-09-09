import { Party } from "../party";

export class JoinOrganizationRequest extends Party {
    private _organizationId: string;
    private _status: string;

    constructor(partyId: string, organizationId: string) {
        super();
        this.partyId = partyId;
        this.organizationId = organizationId;
    }

    get organizationId(): string {
        return this._organizationId;
    }

    set organizationId(value: string) {
        this._organizationId = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    toJson() {
        return {
            partyId: this.partyId,
            organizationId: this.organizationId,
            status: this.status
        };
    }
}