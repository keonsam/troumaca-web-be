import  { App } from "./app";

export const apps: App[] = [
    {
        moduleId: "c87d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Access Roles",
        route: "/access-roles/listing",
        iconClass: "assignment_turned_in"
    },
    {
        moduleId: "c97d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Organizations",
        route: "/parties/organizations/listing",
        iconClass: "business"
    },
    {
        moduleId: "c07d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "About",
        route: "/parties/organization-profile",
        iconClass: "build"
    },
    {
        moduleId: "c17d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Users",
        route: "/parties/users/listing",
        iconClass: "supervised_user_circle"
    },
    {
        moduleId: "c27d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Assets",
        route: "/assets/listing",
        iconClass: "store"
    },
    {
        moduleId: "c67d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Sites",
        route: "/sites/street-addresses",
        iconClass: "location_on"
    },
    {
        moduleId: "c68d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Depreciation",
        route: "/depreciation/book/schedule",
        iconClass: "trending_down"
    }
];
