import { Party } from "../party/party";

export class Photo extends Party {

  photoId: string;
  name: string;
  data: string;
  size: number;
  type: string;

  // Todo: old attributes
  userImage: string;
  organizationImage: string;
}
