import { Credential } from "./credential";
import { Confirmation } from "./confirmation";

export class CreatedCredential {
    credential: Credential;
    confirmation: Confirmation;
    constructor(credential: Credential, confirmation: Confirmation) {
        this.credential = credential;
        this.confirmation = confirmation;
    }

}
