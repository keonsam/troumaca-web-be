import { Credential } from "./credential";
import { Confirmation } from "./confirmation/confirmation";

export interface CreatedCredential {
    credential: Credential;
    confirmation: Confirmation;
}
