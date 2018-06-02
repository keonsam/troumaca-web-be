export class UnionOfPhysicalSite {

  private _siteId:string;
  private _name: string;
  private _describe: string;
  private _city: string;
  private _stateOrProvince: string;
  private _postalCode: string;
  private _country: string;
  private _streetNumber: string;
  private _street: string;
  private _apartmentOrSuite: string;
  private _floor: string;
  private _postOfficeBoxNumber: string;


  constructor(siteId?: string, name?: string, describe?: string, city?: string, stateOrProvince?: string,
              postalCode?: string, country?: string, streetNumber?: string, street?: string, apartmentOrSuite?: string,
              floor?: string, postOfficeBoxNumber?: string) {
    this._siteId = siteId;
    this._name = name;
    this._describe = describe;
    this._city = city;
    this._stateOrProvince = stateOrProvince;
    this._postalCode = postalCode;
    this._country = country;
    this._streetNumber = streetNumber;
    this._street = street;
    this._apartmentOrSuite = apartmentOrSuite;
    this._floor = floor;
    this._postOfficeBoxNumber = postOfficeBoxNumber;
  }

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get describe(): string {
    return this._describe;
  }

  set describe(value: string) {
    this._describe = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get stateOrProvince(): string {
    return this._stateOrProvince;
  }

  set stateOrProvince(value: string) {
    this._stateOrProvince = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get streetNumber(): string {
    return this._streetNumber;
  }

  set streetNumber(value: string) {
    this._streetNumber = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get apartmentOrSuite(): string {
    return this._apartmentOrSuite;
  }

  set apartmentOrSuite(value: string) {
    this._apartmentOrSuite = value;
  }

  get floor(): string {
    return this._floor;
  }

  set floor(value: string) {
    this._floor = value;
  }

  get postOfficeBoxNumber(): string {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: string) {
    this._postOfficeBoxNumber = value;
  }
}
