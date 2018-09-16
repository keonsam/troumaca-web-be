import { Party } from "../party/party";

export class Photo extends Party {

  private _imageStr: string;
  private _userImage: string;
  private _organizationImage: string;

  get userImage(): string {
    return this._userImage;
  }

  get imageStr(): string {
    return this._imageStr;
  }

  set imageStr(value: string) {
    this._imageStr = value;
  }

  set userImage(value: string) {
    this._userImage = value;
  }

  get organizationImage(): string {
    return this._organizationImage;
  }

  set organizationImage(value: string) {
    this._organizationImage = value;
  }

  toJson() {
    return {
        partyId: this.partyId,
        userImage: this.userImage,
        organizationImage: this.organizationImage
    };
  }
}
