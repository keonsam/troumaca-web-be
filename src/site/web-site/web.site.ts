import {VirtualSite} from "../virtual.site";

export class WebSite extends VirtualSite {

  private _uniformResourceIdentifer:string;

  get uniformResourceIdentifer(): string {
    return this._uniformResourceIdentifer;
  }

  set uniformResourceIdentifer(value: string) {
    this._uniformResourceIdentifer = value;
  }
}
