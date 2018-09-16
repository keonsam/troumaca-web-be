import { VirtualSite } from "./virtual.site";

export class WebSite extends VirtualSite {

  private _uniformResourceIdentifier: string;

  get uniformResourceIdentifier(): string {
    return this._uniformResourceIdentifier;
  }

  set uniformResourceIdentifier(value: string) {
    this._uniformResourceIdentifier = value;
  }
}
