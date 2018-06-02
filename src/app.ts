
// let factoryOptions = {
//   "useDatabase": true
// };

import "reflect-metadata";

import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// middleware
import checkAccess from "./middleware/access-check";

// Controllers (route handlers)
import * as assetTypeController from "./asset-type/asset.type.controller";
import * as assetController from "./asset-type/asset/asset.controller";
import * as assetKindController from "./asset-type/kind/asset.kind.controller";
import * as siteController from "./site/site.controller";
import * as unitOfMeasureController from "./unit-of-measure/unit.of.measure.controller";
import * as valueController from "./asset-type/value/value.controller";
import * as assetTypeClassController from "./asset-type/asset-type-class/asset.type.class.controller";
import * as dataTypeController from "./data-type/data.type.controller";
import * as attributeController from "./asset-type/attribute/attribute.controller";
import * as streetAddressController from "./site/street-address/street.address.controller";
import * as postOfficeBoxController from "./site/post-office-box/post.office.box.controller";
import * as emailController from "./site/email/email.controller";
import * as phoneController from "./site/phone/phone.controller";
import * as webSiteController from "./site/web-site/web.site.controller";
import * as userController from "./party/user/user.controller";
import * as organizationController from "./party/organization/organization.controller";
import * as photoController from "./party/photo/photo.controller";
import * as accountController from "./party/account.controller";
import * as credentialController from "./authentication/credential/credential.controller";
import * as confirmationController from "./authentication/credential/confirmation/confirmation.controller";
import * as sessionController from "./session/session.controller";
import * as permissionController from "./authorization/permission/permission.controller";
import * as resourceController from "./authorization/resource/resource.controller";
import * as resourceTypeController from "./authorization/resource-type/resource.type.controller";
import * as resourcePermissionController from "./authorization/resource-permission/resource.permission.controller";
import * as accessRoleController from "./authorization/access-role/access.role.controller";
import * as accessRoleTypeController from "./authorization/access-role-type/access.role.type.controller";
import * as grantController from "./authorization/grant/grant.controller";
import * as partyAccessRoleController from "./authorization/party-access-role/party.access.role.controller";

const app = express();
//const checkAccess = new CheckAccess();

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}));
app.use(express.static(path.join(__dirname, "dist")));
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
};
app.use(cors(corsOptions));
app.use(checkAccess);
//app.use(cors());
// need cookieParser middleware before we can do anything with cookies
// app.use(accessMiddleware());

// routes

// Needs to introduce a middle where that will check active session
// and and add the session information to the request.
// app.use(accessMiddleware());

app.get("/asset-kinds", assetKindController.getAssetKinds); // A get instead of find seeing you are getting all of them.
app.get("/find-asset-types", assetTypeController.findAssetTypes);
app.get("/find-sites", siteController.findSite);
app.get("/find-unit-of-measures", unitOfMeasureController.findUnitOfMeasure);
app.get("/find-persons", userController.findUser);
app.get("/find-asset-type-classes", assetTypeClassController.findAssetTypeClass);
app.get("/find-resource-types", resourceTypeController.findResourceTypes);
app.get("/find-access-roles", accessRoleController.findAccessRoles);
app.get("/find-access-role-types", accessRoleTypeController.findAccessRoleTypes);
app.get("/data-types", dataTypeController.getDataTypes);
//assets
app.get("/assets", assetController.getAssets);
app.get("/assets/:assetId", assetController.getAssetById);
app.post("/assets", assetController.saveAsset);
app.put("/assets/:assetId", assetController.updateAsset);
app.delete("/assets/:assetId", assetController.deleteAsset);
app.get("/asset-types", assetTypeController.getAssetTypes);
app.get("/asset-types/:assetTypeId", assetTypeController.getAssetTypeById);
app.post("/asset-types", assetTypeController.saveAssetType);
app.put("/asset-types/:assetTypeId", assetTypeController.updateAssetType);
app.delete("/asset-types/:assetTypeId", assetTypeController.deleteAssetType);
app.get("/values", valueController.getValues);
app.get("/values/:assetTypeId", valueController.getValuesByAssetTypeId);
app.post("/values", valueController.saveValue);
app.put("/values/:assetTypeId", valueController.updateValue); // use assetTypeId to avoid sending one than one request to the server
app.delete("/values/:valueId", valueController.deleteValue);
app.get("/asset-type-classes", assetTypeClassController.getAssetTypeClasses);
app.get("/asset-type-classes/:assetTypeClassId", assetTypeClassController.getAssetTypeClass);
app.post("/asset-type-classes", assetTypeClassController.saveAssetTypeClass);
app.put("/asset-type-classes/:assetTypeClassId", assetTypeClassController.updateAssetTypeClass);
app.delete("/asset-type-classes/:assetTypeClassId", assetTypeClassController.deleteAssetTypeClass);
app.get("/attributes", attributeController.getAttributes);
app.get("/attributes/:attributeId", attributeController.getAttributeById);
app.get("/available-attributes", attributeController.getAvailableAttributes);
app.get("/assigned-attributes", attributeController.getAssignedAttributes);
app.get("/assigned-attributes/:assetTypeClassId", attributeController.getAssignedAttributeByClassId);
app.post("/attributes", attributeController.saveAttribute);
app.put("/attributes/:attributeId", attributeController.updateAttribute);
app.delete("/attributes/:attributeId", attributeController.deleteAttribute);
app.get("/street-addresses", streetAddressController.getStreetAddresses);
app.get("/street-addresses/:siteId", streetAddressController.getStreetAddressById);
app.post("/street-addresses", streetAddressController.saveStreetAddress);
app.put("/street-addresses/:siteId", streetAddressController.updateStreetAddress);
app.delete("/street-addresses/:siteId", streetAddressController.deleteStreetAddress);
app.get("/post-office-boxes", postOfficeBoxController.getPostOfficeBoxes);
app.get("/post-office-boxes/:siteId", postOfficeBoxController.getPostOfficeBoxById);
app.post("/post-office-boxes", postOfficeBoxController.savePostOfficeBox);
app.put("/post-office-boxes/:siteId", postOfficeBoxController.updatePostOfficeBox);
app.delete("/post-office-boxes/:siteId", postOfficeBoxController.deletePostOfficeBox);
app.get("/emails", emailController.getEmails);
app.get("/emails/:siteId", emailController.getEmailById);
app.post("/emails", emailController.saveEmail);
app.put("/emails/:siteId", emailController.updateEmail);
app.delete("/emails/:siteId", emailController.deleteEmail);
app.get("/web-sites", webSiteController.getWebSites);
app.get("/web-sites/:siteId", webSiteController.getWebSiteById);
app.post("/web-sites", webSiteController.saveWebSite);
app.put("/web-sites/:siteId", webSiteController.updateWebSite);
app.delete("/web-sites/:siteId", webSiteController.deleteWebSite);
app.get("/phones", phoneController.getPhones);
app.get("/phones/:siteId", phoneController.getPhoneById);
app.post("/phones", phoneController.savePhone);
app.put("/phones/:siteId", phoneController.updatePhone);
app.delete("/phones/:siteId", phoneController.deletePhone);
app.get("/users", userController.getUsers);
app.get("/users/:partyId", userController.getUser);
app.post("/users", userController.saveUser);
app.put("/users/:partyId", userController.updateUser);
app.put("/users-me/:partyId", userController.updateUserMe);
app.delete("/users/:partyId", userController.deleteUser);
app.get("/organizations", organizationController.getOrganizations);
app.get("/organizations/:partyId", organizationController.getOrganization);
app.post("/organizations", organizationController.saveOrganization);
app.put("/organizations/:partyId", organizationController.updateOrganization);
app.delete("/organizations/:partyId", organizationController.deleteOrganization);
app.get("/photos/:type/:partyId", photoController.getPhotoById);
app.post("/photos/:type/:partyId", photoController.savePhoto);
app.put("/photos/:type/:partyId", photoController.updatePhoto);
//app.delete("/photos/:type/:partyId", photoController.deletePhoto);
app.post("/accounts", accountController.saveAccount);
app.post("/validate-password", credentialController.isValidPassword);
app.post("/validate-username", credentialController.isValidUsername);
app.post("/validate-edit-username", credentialController.isValidEditUsername);
app.post("/authenticate", credentialController.authenticate);
app.post("/forgot-password", credentialController.forgotPassword);
app.post("/credentials", credentialController.addCredential);
app.put("/credentials/:partyId", credentialController.updateCredential);
app.post("/verify-credentials-confirmations", confirmationController.verifyCredentialConfirmation);
app.get("/send-confirmation-codes/:confirmationId", confirmationController.sendPhoneVerificationCode);
app.get("/get-confirmations-username/:credentialConfirmationId", confirmationController.getConfirmationsUsername);
//app.get("/send-confirmation-codes/email/:confirmationId", confirmationController.sendEmailVerificationCode);
app.get("/sessions/current-user-session", sessionController.getSimpleSession);
app.get("/sessions/is-valid-session", sessionController.isValidSession);
app.get("/partyId", sessionController.getPartyId);
app.get("/sessions/log-out-user", sessionController.handleSessionLogOut);
//permissions
app.get("/permissions", permissionController.getPermissions);
app.get("/permissions/:permissionId", permissionController.getPermissionById);
app.post("/permissions", permissionController.savePermission);
app.post("/permissions/permissions", permissionController.getPermissionsByArray);
app.post("/permissions/resource-permissions", permissionController.getResourcePermissionsByArray);
app.put("/permissions/:permissionId", permissionController.updatePermission);
app.delete("/permissions/:permissionId", permissionController.deletePermission);
//resources
app.get("/resources", resourceController.getResources);
app.get("/resources/:resourceId", resourceController.getResourceById);
app.post("/get-resources/resources", resourceController.getResourcesByArray);
app.post("/get-resources/assigned-resources", resourceController.getAssignedResourcesByArray);
app.post("/resources", resourceController.saveResource);
app.put("/resources/:resourceId", resourceController.updateResource);
app.delete("/resources/:resourceId", resourceController.deleteResource);
//resourcetypes
app.get("/resource-types", resourceTypeController.getResourceTypes);
app.get("/resource-types/:resourceTypeId", resourceTypeController.getResourceTypeById);
app.post("/resource-types", resourceTypeController.saveResourceType);
app.put("/resource-types/:resourceTypeId", resourceTypeController.updateResourceType);
app.delete("/resource-types/:resourceTypeId", resourceTypeController.deleteResourceType);
//resourcePermissions
app.get("/resource-permissions-by-id/:resourceId", resourcePermissionController.getResourcePermissionsByResourceId);
app.get("/get-all-resource-permissions", resourcePermissionController.getAllResourcePermissions);
// access-roles
app.get("/access-roles", accessRoleController.getAccessRoles);
app.get("/access-roles/:accessRoleId", accessRoleController.getAccessRoleById);
app.post("/access-roles",accessRoleController.saveAccessRole);
app.put("/access-roles/:accessRoleId", accessRoleController.updateAccessRole);
app.delete("/access-roles/:accessRoleId", accessRoleController.deleteAccessRole);
// access-role-types
app.get("/access-role-types", accessRoleTypeController.getAccessRoleTypes);
app.get("/access-role-types/:accessRoleTypeId", accessRoleTypeController.getAccessRoleTypeById);
app.post("/access-role-types",accessRoleTypeController.saveAccessRoleType);
app.put("/access-role-types/:accessRoleTypeId", accessRoleTypeController.updateAccessRoleType);
app.delete("/access-role-types/:accessRoleTypeId", accessRoleTypeController.deleteAccessRoleType);
//grants
app.get("/grants/:accessRoleId",grantController.getGrantsByAccessRoleId);
//partyAccessRoles
app.get("/party-access-roles",partyAccessRoleController.getPartyAccessRoles);
app.get("/party-access-roles/:partyId",partyAccessRoleController.getPartyAccessRoleById);
// Needs to introduce a middle where that will check active session
// and and add the session information to the request.

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.setHeader("Content-Type", "application/json");
  res.send('{"message":"Express REST API error"}');
  res.render("error");
});

export default app;
