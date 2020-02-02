import {Organization} from "./organization";
import { Activity } from "../activity/activity";
import {Party} from "./party";

export class CompanyInfo {
  organization: Organization;
  activities: Activity[];
  users: number;
  assets: number;
  constructor(organization: Organization, activities: Activity[], usersNum: number, assetsNum: number) {
    this.organization = organization;
    this.activities = activities;
    this.users = usersNum;
    this.assets = assetsNum;
  }
}
