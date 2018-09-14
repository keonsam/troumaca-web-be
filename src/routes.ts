import { Router } from "express";

import * as confirmationController from "./authentication/credential/confirmation/confirmation.controller";
import * as credentialController from "./authentication/credential/credential.controller";
import * as permissionController from "./authorization/permission/permission.controller";
import * as resourceController from "./authorization/resource/resource.controller";
import * as accessRoleController from "./authorization/access-role/access.role.controller";
import * as accessRoleTypeController from "./authorization/access-role-type/access.role.type.controller";
import * as resourcePermissionController from "./authorization/resource-permission/resource.permission.controller";
import * as resourceTypeController from "./authorization/resource-type/resource.type.controller";

import * as assetController from "./asset-type/asset/asset.controller";
import * as attributeController from "./asset-type/attribute/attribute.controller";
import * as assignedAttributeController from "./asset-type/attribute/assigned-attributes/assigned.attribute.controller"
import * as assetKindController from "./asset-type/kind/asset.kind.controller";
import * as phoneController from "./site/phone/phone.controller";
import * as accountController from "./party/account.controller";
import * as photoController from "./party/photo/photo.controller";
import * as unitOfMeasureController from "./unit-of-measure/unit.of.measure.controller";
import * as dataTypeController from "./data-type/data.type.controller";
import * as emailController from "./site/email/email.controller";
import * as siteController from "./site/site.controller";
import * as webSiteController from "./site/web-site/web.site.controller";
import * as postOfficeBoxController from "./site/post-office-box/post.office.box.controller";
import * as streetAddressController from "./site/street-address/street.address.controller";
import * as sessionController from "./session/session.controller";
import * as userController from "./party/user/user.controller";
import * as assetTypeClassController from "./asset-type/asset-type-class/asset.type.class.controller";
import * as assetTypeController from "./asset-type/asset.type.controller";
import * as organizationController from "./party/organization/organization.controller";
import * as subscriptionController from "./subscription/subscription.controller";
import * as billingController from "./billing/billing.controller";
import * as depreciationController from "./depreciation/depreciation.controller";

import checkSession from "./middleware/check-session";

const router: Router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to Troumaca API"
    });
});
// asset-kind
router.get("/asset-kinds", checkSession, assetKindController.getAssetKinds);

// unit-of-measure
router.get("/unit-of-measures/find", checkSession, unitOfMeasureController.findUnitOfMeasure);

// data-type
router.get("/data-types", checkSession, dataTypeController.getDataTypes);

// asset
router.get("/assets/find", checkSession, assetController.findAssets);
router.get("/assets", checkSession, assetController.getAssets);
router.get("/assets/:assetId", checkSession, assetController.getAssetById);
router.post("/assets", checkSession, assetController.saveAsset);
router.put("/assets/:assetId", checkSession, assetController.updateAsset);
router.delete("/assets/:assetId", checkSession, assetController.deleteAsset);

// asset-type
router.get("/asset-types/find", checkSession, assetTypeController.findAssetTypes);
router.get("/asset-types", checkSession, assetTypeController.getAssetTypes);
router.get("/asset-types/:assetTypeId", checkSession, assetTypeController.getAssetTypeById);
router.post("/asset-types", checkSession, assetTypeController.saveAssetType);
router.put("/asset-types/:assetTypeId", checkSession, checkSession, assetTypeController.updateAssetType);
router.delete("/asset-types/:assetTypeId", checkSession, assetTypeController.deleteAssetType);

// asset-type-class
router.get("/asset-type-classes/find", checkSession, assetTypeClassController.findAssetTypeClass);
router.get("/asset-type-classes", checkSession, assetTypeClassController.getAssetTypeClasses);
router.get("/asset-type-classes/:assetTypeClassId", checkSession, assetTypeClassController.getAssetTypeClass);
router.post("/asset-type-classes", checkSession, assetTypeClassController.saveAssetTypeClass);
router.put("/asset-type-classes/:assetTypeClassId", checkSession, assetTypeClassController.updateAssetTypeClass);
router.delete("/asset-type-classes/:assetTypeClassId", checkSession, assetTypeClassController.deleteAssetTypeClass);

// attribute
router.get("/attributes", checkSession, attributeController.getAttributes);
router.get("/attributes/:attributeId", checkSession, attributeController.getAttributeById);
router.post("/attributes", checkSession, attributeController.saveAttribute);
router.put("/attributes/:attributeId", checkSession, attributeController.updateAttribute);
router.delete("/attributes/:attributeId", checkSession, attributeController.deleteAttribute);

// assigned-attributes
// router.get("/available-attributes", attributeController.getAvailableAttributes);
router.get("/assignable-attributes/:type", checkSession, assignedAttributeController.getAssignableAttributes);
router.get("/assigned-attributes/:assetTypeClassId", checkSession, assignedAttributeController.getAssignedAttributesByClassId);

// site
router.get("/sites/find", checkSession, siteController.findSite);

// street-address
router.get("/street-addresses", checkSession, streetAddressController.getStreetAddresses);
router.get("/street-addresses/:siteId", checkSession, streetAddressController.getStreetAddressById);
router.post("/street-addresses", checkSession, streetAddressController.saveStreetAddress);
router.put("/street-addresses/:siteId", checkSession, streetAddressController.updateStreetAddress);
router.delete("/street-addresses/:siteId", checkSession, streetAddressController.deleteStreetAddress);

// post office box
router.get("/post-office-boxes", checkSession, postOfficeBoxController.getPostOfficeBoxes);
router.get("/post-office-boxes/:siteId", checkSession, postOfficeBoxController.getPostOfficeBoxById);
router.post("/post-office-boxes", checkSession, postOfficeBoxController.savePostOfficeBox);
router.put("/post-office-boxes/:siteId", checkSession, postOfficeBoxController.updatePostOfficeBox);
router.delete("/post-office-boxes/:siteId", checkSession, postOfficeBoxController.deletePostOfficeBox);

// emails
router.get("/emails", checkSession, emailController.getEmails);
router.get("/emails/:siteId", checkSession, emailController.getEmailById);
router.post("/emails", checkSession, emailController.saveEmail);
router.put("/emails/:siteId", checkSession, emailController.updateEmail);
router.delete("/emails/:siteId", checkSession, emailController.deleteEmail);

// web-site
router.get("/web-sites", checkSession, webSiteController.getWebSites);
router.get("/web-sites/:siteId", checkSession, webSiteController.getWebSiteById);
router.post("/web-sites", checkSession, webSiteController.saveWebSite);
router.put("/web-sites/:siteId", checkSession, webSiteController.updateWebSite);
router.delete("/web-sites/:siteId", checkSession, webSiteController.deleteWebSite);

// phone
router.get("/phones", checkSession, phoneController.getPhones);
router.get("/phones/:siteId", checkSession, phoneController.getPhoneById);
router.post("/phones", checkSession, phoneController.savePhone);
router.put("/phones/:siteId", checkSession, phoneController.updatePhone);
router.delete("/phones/:siteId", checkSession, phoneController.deletePhone);

// party
// user
router.get("/users/find", checkSession, userController.findUser);
router.get("/users", checkSession, userController.getUsers);
router.get("/users/:partyId", checkSession, userController.getUser);
router.post("/users", checkSession, userController.saveUser);
router.put("/users/:partyId", userController.updateUser);
// TODO : Fix this /users-me
router.put("/users-me/:partyId", checkSession, userController.updateUserMe);
router.delete("/users/:partyId", checkSession, userController.deleteUser);
// organizations
router.get("/organizations", checkSession, organizationController.getOrganizations);
router.get("/organizations/:partyId", checkSession, organizationController.getOrganization);
router.post("/organizations", checkSession, organizationController.saveOrganization);
router.put("/organizations/:partyId", checkSession, organizationController.updateOrganization);
router.delete("/organizations/:partyId", checkSession, organizationController.deleteOrganization);

// photos
router.get("/photos/:type/:partyId", checkSession, photoController.getPhotoById);
router.post("/photos/:type", checkSession, photoController.savePhoto);
router.put("/photos/:type/:partyId", checkSession, photoController.updatePhoto);

// accounts
router.post("/accounts", checkSession, accountController.saveAccount);

// ##### SECURITY START #####
// AUTHENTICATION
//Todo: Delete after front end is upgraded
router.post("/validate-username", credentialController.isValidUsername);
router.post("/validate-password", credentialController.isValidPassword);
router.post("/authenticate", credentialController.authenticate);

router.post("/authentication/validate-password", credentialController.isValidPassword);
router.post("/authentication/validate-username", credentialController.isValidUsername);
router.post("/authentication/credentials", credentialController.addCredential);
router.post("/authentication/authenticate", credentialController.authenticate);

// CONFIRMATION
router.get("/send-confirmation-codes/:credentialId/:confirmationId", confirmationController.resendConfirmCode);
router.post("/verify-credentials-confirmations", confirmationController.confirmCode);
router.post("/authentication/confirmations/{confirmationId}/credentials/{credentialId}", confirmationController.confirmCode);


// Todo: Check into why this is needed
// router.post("/validate-edit-username", credentialController.isValidEditUsername);
// router.post("/authenticate", credentialController.authenticate);
// router.post("/forgot-password", credentialController.forgotPassword);
// router.post("/credentials", credentialController.addCredential);
// router.put("/credentials/:partyId", credentialController.updateCredential);
// router.delete("/credentials/:credentialId", credentialController.deleteCredential);
// router.get("/send-confirmation-codes/:confirmationId", confirmationController.sendPhoneVerificationCode);
// router.get("/get-confirmations-username/:credentialConfirmationId", confirmationController.getConfirmationsUsername);

// SESSION
router.get("/sessions/is-valid-session", checkSession, sessionController.isValidSession);
router.get("/partyId", checkSession, sessionController.getPartyId);
router.get("/sessions/log-out-user", checkSession, sessionController.handleSessionLogOut);

// permissions
router.get("/permissions", checkSession, permissionController.getPermissions);
router.get("/permissions/permissions", checkSession, permissionController.getPermissionsByArray);
router.get("/permissions/resource-permissions", checkSession, permissionController.getResourcePermissionsByArray);
router.get("/permissions/:permissionId", checkSession, permissionController.getPermissionById);
router.post("/permissions", checkSession, permissionController.savePermission);
router.put("/permissions/:permissionId", checkSession, permissionController.updatePermission);
router.delete("/permissions/:permissionId", checkSession, permissionController.deletePermission);

// resources
router.get("/resources", checkSession, resourceController.getResources);
router.get("/resources/resources", checkSession, resourceController.getResourcesByArray);
router.get("/resources/assigned-resources", checkSession, resourceController.getAssignedResourcesByArray);
router.get("/resources/:resourceId", checkSession, resourceController.getResourceById);
router.post("/resources", checkSession, resourceController.saveResource);
router.put("/resources/:resourceId", checkSession, resourceController.updateResource);
router.delete("/resources/:resourceId", checkSession, resourceController.deleteResource);

// resource-types
router.get("/resource-types/find", checkSession, resourceTypeController.findResourceTypes);
router.get("/resource-types", checkSession, resourceTypeController.getResourceTypes);
router.get("/resource-types/:resourceTypeId", checkSession, resourceTypeController.getResourceTypeById);
router.post("/resource-types", checkSession, resourceTypeController.saveResourceType);
router.put("/resource-types/:resourceTypeId", checkSession, resourceTypeController.updateResourceType);
router.delete("/resource-types/:resourceTypeId", checkSession, resourceTypeController.deleteResourceType);

// resource-permissions
router.get("/resource-permissions", checkSession, resourcePermissionController.getAllResourcePermissions);
router.get("/resource-permissions/:resourceId", checkSession, resourcePermissionController.getResourcePermissionsByResourceId);

// access-roles
router.get("/access-roles/find", checkSession, accessRoleController.findAccessRoles);
router.get("/access-roles", checkSession, accessRoleController.getAccessRoles);
router.get("/access-roles/:accessRoleId", checkSession, accessRoleController.getAccessRoleById);
router.post("/access-roles", checkSession, accessRoleController.saveAccessRole);
router.put("/access-roles/:accessRoleId", checkSession, accessRoleController.updateAccessRole);
router.delete("/access-roles/:accessRoleId", checkSession, accessRoleController.deleteAccessRole);

// access-role-types
router.get("/access-role-types/find", checkSession, accessRoleTypeController.findAccessRoleTypes);
router.get("/access-role-types", checkSession, accessRoleTypeController.getAccessRoleTypes);
router.get("/access-role-types/:accessRoleTypeId", checkSession, accessRoleTypeController.getAccessRoleTypeById);
router.post("/access-role-types", checkSession, accessRoleTypeController.saveAccessRoleType);
router.put("/access-role-types/:accessRoleTypeId", checkSession, accessRoleTypeController.updateAccessRoleType);
router.delete("/access-role-types/:accessRoleTypeId", checkSession, accessRoleTypeController.deleteAccessRoleType);

// ##### SECURITY END #####
// SUBSCRIPTION
router.get("/subscription/information", checkSession, subscriptionController.getSubscriptionInformation);
router.get("/subscriptions/:type", checkSession, subscriptionController.getSubscription);
router.post("/subscriptions", checkSession, subscriptionController.addSubscription);

// BILLING
router.get("/billings", checkSession, billingController.getBilling);
router.post("/billings", checkSession, billingController.addBilling);
router.put("/billings/:billingId", checkSession, billingController.updateBilling);
router.post( "/validate-credit-card/name", checkSession, billingController.cardName);
router.post( "/validate-credit-card/number", checkSession, billingController.cardNumber);
router.post( "/validate-credit-card/exp-date", checkSession, billingController.cardExpDate);
router.post( "/validate-credit-card/cvv", checkSession, billingController.cardCVV);

// DEPRECIATION
router.get("/depreciation-methods/:type/:system", checkSession, depreciationController.getDepreciationMethod);
router.get("/depreciation-systems", checkSession, depreciationController.getDepreciationSystems);
router.get("/depreciation-property-classes/:system", checkSession, depreciationController.getPropertyClasses);

router.get("/depreciation/assets/find", checkSession, depreciationController.getDepreciableAssets);
router.get("/book-depreciation", checkSession, depreciationController.getBookDepreciationArr);
router.get("/tax-depreciation", checkSession, depreciationController.getTaxDepreciationArr);
router.get("/depreciation/:depreciationId/:type", checkSession, depreciationController.getDepreciationById);
router.post("/depreciation", checkSession, depreciationController.saveDepreciation);
router.put("/depreciation/:depreciationId", checkSession, depreciationController.updateDepreciation);
router.delete("/depreciation/:depreciationId/:type", checkSession, depreciationController.deleteDepreciation);


export default router;