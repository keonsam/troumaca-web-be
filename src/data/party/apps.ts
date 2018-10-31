import  { App } from "./app";

export const apps: App[] = [
    {
        moduleId: "d76d3eef-4858-42b1-93f0-93ace4b88ac2",
        name: "Asset Management",
        subscribed: false,
        description: "Manage assets in the cloud to create effective databases breakdowns",
        features: ["Assets", "Asset Types", "Asset Classes", "Attributes", "Site Management", "Data Types"],
        route: "/assets",
        price: "199.99",
        iconClass: "os-icon os-icon-delivery-box-2"
    },
    {
        moduleId: "e350595f-3628-4522-8ff0-ff8ecc0a8c15",
        name: "User Management",
        subscribed: false,
        description: "Allows users to access and management your assets",
        features: ["Users", "Authorization", "Profile Page"],
        route: "parties/users/listing",
        price: "Free",
        iconClass: "os-icon os-icon-user-male-circle"
    },
    {
        moduleId: "ea88c01b-1a13-4680-a560-3f9ac4fc72fb",
        name: "Organization Management",
        subscribed: false,
        description: "Create organizations to manage their assets and users in the cloud",
        features: ["Organization", "Organization Profile Page"],
        route: "/parties",
        price: "Free",
        iconClass: "os-icon os-icon-hierarchy-structure-2"
    },
    {
        moduleId: "c51ee5b3-fdc4-4fdb-82b4-866be5350b90",
        name: "Depreciation Management",
        subscribed: false,
        description: "Manage asset depreciation",
        features: ["Asset Depreciation", "Tax Depreciation", "Depreciation Schedule"],
        route: "/depreciation",
        price: "99.99",
        iconClass: "os-icon os-icon-graph-down"
    }
];
