import { Credential } from "./credential";
import { Confirmation } from "./confirmation";

export class CreatedCredential {
    private _credential: Credential;
    private _confirmation: Confirmation;
    constructor(credential: Credential, confirmation: Confirmation) {
        this.credential = credential;
        this.confirmation = confirmation;
    }

    get credential(): Credential {
        return this._credential;
    }

    set credential(value: Credential) {
        this._credential = value;
    }

    get confirmation(): Confirmation {
        return this._confirmation;
    }

    set confirmation(value: Confirmation) {
        this._confirmation = value;
    }
}
