import {MiddlewareFn} from "type-graphql";
import {MyContext} from "../graphql/my.context";
import {AuthenticationError} from "apollo-server-express";
import {map} from "rxjs/operators";
import {SessionOrchestrator} from "../application/service/session/session.orchestrator";

const sessionOrchestrator = new SessionOrchestrator();

export const isAuth: MiddlewareFn<MyContext> = async ({ context: { req } }, next) => {
    if (!req.session.sessionId) {
        throw new Error("You must be logged in.");
    } else {
        return await sessionOrchestrator
            .isValidSession(req.session.sessionId)
            .pipe(map(isValid => {
                if (isValid.valid) {
                    req.headers["Party-ID"] = isValid.partyId;
                    req.headers["Owner-Party-ID"] = isValid.ownerPartyId;
                    return next();
                } else {
                    throw new AuthenticationError("Invalid session...");
                }
            })).toPromise();
    }
};
