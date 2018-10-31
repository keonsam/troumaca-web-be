import {ModuleInformation} from "./module.information";

export class Module {
  moduleId: string;
  name: string;
  subscribed: boolean;
  information: ModuleInformation;
}
