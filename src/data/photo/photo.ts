import { Party } from "../party/party";

export class Photo extends Party {

  id: string;
  name: string;
  data: string;
  size: number;
  height: string;
  width: string;

  // Todo: old attributes
  userImage: any;
  organizationImage: any;
}
