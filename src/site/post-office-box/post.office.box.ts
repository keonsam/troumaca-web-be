import { PhysicalSite } from "../physical.site";

export class PostOfficeBox extends PhysicalSite {

  private _postOfficeBoxNumber: string;

  get postOfficeBoxNumber(): string {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: string) {
    this._postOfficeBoxNumber = value;
  }

}
