import { SchemaDirectiveVisitor, AuthenticationError } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { SessionOrchestrator } from "../application/service/session/session.orchestrator";
import { map } from "rxjs/operators";

const sessionOrchestrator = new SessionOrchestrator();

export class RequireAuth extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>): GraphQLField<any, any> | void | null {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async (...args) => {
            const [, , context] = args;
            if (!context.req.session.sessionId) {
                throw new AuthenticationError("You must be logged in.");
            }
            return await sessionOrchestrator
            .isValidSession(context.req.session.sessionId)
            .pipe(map(isValid => {
                if (isValid) {
                    context.req.headers["Party-ID"] = isValid.partyId;
                    context.req.headers["Owner-Party-ID"] = isValid.ownerPartyId;
                    return resolve.apply(this, args);
                } else {
                    throw new AuthenticationError("Invalid session...");
                }
            })).toPromise();
        };
    }
}
