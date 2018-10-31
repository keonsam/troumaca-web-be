import {Party} from "../party/party";

export class Photo extends Party {

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _data: string;

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }

  private _size: number;

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  private _height: string;

  get height(): string {
    return this._height;
  }

  set height(value: string) {
    this._height = value;
  }

  private _width: string;

  get width(): string {
    return this._width;
  }

  set width(value: string) {
    this._width = value;
  }

  // Todo: old attributes
  private _imageStr: string;

  get imageStr(): string {
    return this._imageStr;
  }

  set imageStr(value: string) {
    this._imageStr = value;
  }

  private _userImage: string;

  get userImage(): string {
    return this._userImage;
  }

  set userImage(value: string) {
    this._userImage = value;
  }

  private _organizationImage: string;

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
