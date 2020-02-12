import {Organization} from "./organization/organization";
import { Activity } from "../activity/activity";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CompanyInfo {
  @Field({nullable: true})
  organization: Organization;
  @Field( () => Activity, {nullable: true})
  activities: Activity[] = [];
  @Field({nullable: true})
  users: number;
  @Field({nullable: true})
  assets: number;

  constructor(organization: Organization, activities: Activity[], usersNum: number, assetsNum: number) {
    this.organization = organization;
    this.activities = activities;
    this.users = usersNum;
    this.assets = assetsNum;
  }

}
