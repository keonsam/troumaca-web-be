import {AuthChecker} from "type-graphql";
import {SessionOrchestrator} from "../application/service/session/session.orchestrator";

const sessionOrchestrator = new SessionOrchestrator();

export const customAuthChecker: AuthChecker<any> = ({  context: { req } }, roles) => {
    console.log(req.session.sessionId);
    return true;
};
