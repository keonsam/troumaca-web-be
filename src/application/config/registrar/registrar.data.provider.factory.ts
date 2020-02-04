import {Container} from "typedi";
import {RegisterResolver} from "../../../presentation/register/register.resolver";
import {RegisterOrchestrator} from "../../service/register/register.orchestrator";
import {RegisterDataProvider} from "../../../port/register.data.provider";
import {RegisterDataProviderContext} from "../../../infrastructure/register/register.data.provider.context";
import {createRegistrarDataProvider} from "../../../infrastructure/register/register.data.provider.factory";

export class RegistrarConfig {
  constructor() {
    let registrarDataProvider = createRegistrarDataProvider();
    Container.set("RegisterResolver", new RegisterResolver());
    Container.set("RegisterOrchestrator", new RegisterOrchestrator());
    Container.set("RegisterDataProvider", new RegisterDataProviderContext(registrarDataProvider));
  }
}