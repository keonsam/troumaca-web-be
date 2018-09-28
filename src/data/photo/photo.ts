import { Party } from "../party/party";

export class Photo extends Party {

  private _id: string;
  private _name: string;
  private _data: string;
  private _size: number;
  private _height: string;
  private _width: string;

  // Todo: old attributes
  private _imageStr: string;
  private _userImage: string;
  private _organizationImage: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get height(): string {
    return this._height;
  }

  set height(value: string) {
    this._height = value;
  }

  get width(): string {
    return this._width;
  }

  set width(value: string) {
    this._width = value;
  }


  get userImage(): string {
    return this._userImage;
  }

  set userImage(value: string) {
    this._userImage = value;
  }

  get imageStr(): string {
    return this._imageStr;
  }

  set imageStr(value: string) {
    this._imageStr = value;
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
