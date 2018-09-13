import { Router } from "express";
import bodyParser from "body-parser";

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

const router: Router = Router();
const jsonParser = bodyParser.json({ type: "application/json"});
// const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to Troumaca API"
    });
});
// asset-kind
router.get("/asset-kinds", assetKindController.getAssetKinds);

// unit-of-measure
router.get("/unit-of-measures/find", unitOfMeasureController.findUnitOfMeasure);

// data-type
router.get("/data-types", dataTypeController.getDataTypes);

// asset
router.get("/assets/find", assetController.findAssets);
router.get("/assets", assetController.getAssets);
router.get("/assets/:assetId", assetController.getAssetById);
router.post("/assets", assetController.saveAsset);
router.put("/assets/:assetId", assetController.updateAsset);
router.delete("/assets/:assetId", assetController.deleteAsset);

// asset-type
router.get("/asset-types/find", assetTypeController.findAssetTypes);
router.get("/asset-types", assetTypeController.getAssetTypes);
router.get("/asset-types/:assetTypeId", assetTypeController.getAssetTypeById);
router.post("/asset-types", assetTypeController.saveAssetType);
router.put("/asset-types/:assetTypeId", assetTypeController.updateAssetType);
router.delete("/asset-types/:assetTypeId", assetTypeController.deleteAssetType);

// asset-type-class
router.get("/asset-type-classes/find", assetTypeClassController.findAssetTypeClass);
router.get("/asset-type-classes", assetTypeClassController.getAssetTypeClasses);
router.get("/asset-type-classes/:assetTypeClassId", assetTypeClassController.getAssetTypeClass);
router.post("/asset-type-classes", assetTypeClassController.saveAssetTypeClass);
router.put("/asset-type-classes/:assetTypeClassId", assetTypeClassController.updateAssetTypeClass);
router.delete("/asset-type-classes/:assetTypeClassId", assetTypeClassController.deleteAssetTypeClass);

// attribute
router.get("/attributes", attributeController.getAttributes);
router.get("/attributes/:attributeId", attributeController.getAttributeById);
router.post("/attributes", attributeController.saveAttribute);
router.put("/attributes/:attributeId", attributeController.updateAttribute);
router.delete("/attributes/:attributeId", attributeController.deleteAttribute);

// assigned-attributes
// router.get("/available-attributes", attributeController.getAvailableAttributes);
router.get("/assignable-attributes/:type", assignedAttributeController.getAssignableAttributes);
router.get("/assigned-attributes/:assetTypeClassId", assignedAttributeController.getAssignedAttributesByClassId);

// site
router.get("/sites/find", siteController.findSite);

// street-address
router.get("/street-addresses", streetAddressController.getStreetAddresses);
router.get("/street-addresses/:siteId", streetAddressController.getStreetAddressById);
router.post("/street-addresses", streetAddressController.saveStreetAddress);
router.put("/street-addresses/:siteId", streetAddressController.updateStreetAddress);
router.delete("/street-addresses/:siteId", streetAddressController.deleteStreetAddress);

// post office box
router.get("/post-office-boxes", postOfficeBoxController.getPostOfficeBoxes);
router.get("/post-office-boxes/:siteId", postOfficeBoxController.getPostOfficeBoxById);
router.post("/post-office-boxes", postOfficeBoxController.savePostOfficeBox);
router.put("/post-office-boxes/:siteId", postOfficeBoxController.updatePostOfficeBox);
router.delete("/post-office-boxes/:siteId", postOfficeBoxController.deletePostOfficeBox);

// emails
router.get("/emails", emailController.getEmails);
router.get("/emails/:siteId", emailController.getEmailById);
router.post("/emails", emailController.saveEmail);
router.put("/emails/:siteId", emailController.updateEmail);
router.delete("/emails/:siteId", emailController.deleteEmail);

// web-site
router.get("/web-sites", webSiteController.getWebSites);
router.get("/web-sites/:siteId", webSiteController.getWebSiteById);
router.post("/web-sites", webSiteController.saveWebSite);
router.put("/web-sites/:siteId", webSiteController.updateWebSite);
router.delete("/web-sites/:siteId", webSiteController.deleteWebSite);

// phone
router.get("/phones", phoneController.getPhones);
router.get("/phones/:siteId", phoneController.getPhoneById);
router.post("/phones", phoneController.savePhone);
router.put("/phones/:siteId", phoneController.updatePhone);
router.delete("/phones/:siteId", phoneController.deletePhone);

// party
// user
router.get("/users/find", userController.findUser);
router.get("/users", userController.getUsers);
router.get("/users/:partyId", userController.getUser);
router.post("/users", userController.saveUser);
router.put("/users/:partyId", userController.updateUser);
// TODO : Fix this /users-me
router.put("/users-me/:partyId", userController.updateUserMe);
router.delete("/users/:partyId", userController.deleteUser);
// organizations
router.get("/organizations", organizationController.getOrganizations);
router.get("/organizations/:partyId", organizationController.getOrganization);
router.post("/organizations", organizationController.saveOrganization);
router.put("/organizations/:partyId", organizationController.updateOrganization);
router.delete("/organizations/:partyId", organizationController.deleteOrganization);

// photos
router.get("/photos/:type/:partyId", photoController.getPhotoById);
router.post("/photos/:type", photoController.savePhoto);
router.put("/photos/:type/:partyId", photoController.updatePhoto);

// accounts
router.post("/accounts", accountController.saveAccount);

// ##### SECURITY START #####
// AUTHENTICATION
//Todo: Delete after front end is upgraded
router.post("/validate-username", jsonParser, credentialController.isValidUsername);
router.post("/validate-password", jsonParser, credentialController.isValidPassword);
router.post("/authenticate", credentialController.authenticate);

router.post("/authentication/validate-password", jsonParser, credentialController.isValidPassword);
router.post("/authentication/validate-username", jsonParser, credentialController.isValidUsername);
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
router.get("/sessions/is-valid-session", sessionController.isValidSession);
router.get("/partyId", sessionController.getPartyId);
router.get("/sessions/log-out-user", sessionController.handleSessionLogOut);

// permissions
router.get("/permissions", permissionController.getPermissions);
router.get("/permissions/permissions", permissionController.getPermissionsByArray);
router.get("/permissions/resource-permissions", permissionController.getResourcePermissionsByArray);
router.get("/permissions/:permissionId", permissionController.getPermissionById);
router.post("/permissions", permissionController.savePermission);
router.put("/permissions/:permissionId", permissionController.updatePermission);
router.delete("/permissions/:permissionId", permissionController.deletePermission);

// resources
router.get("/resources", resourceController.getResources);
router.get("/resources/resources", resourceController.getResourcesByArray);
router.get("/resources/assigned-resources", resourceController.getAssignedResourcesByArray);
router.get("/resources/:resourceId", resourceController.getResourceById);
router.post("/resources", resourceController.saveResource);
router.put("/resources/:resourceId", resourceController.updateResource);
router.delete("/resources/:resourceId", resourceController.deleteResource);

// resource-types
router.get("/resource-types/find", resourceTypeController.findResourceTypes);
router.get("/resource-types", resourceTypeController.getResourceTypes);
router.get("/resource-types/:resourceTypeId", resourceTypeController.getResourceTypeById);
router.post("/resource-types", resourceTypeController.saveResourceType);
router.put("/resource-types/:resourceTypeId", resourceTypeController.updateResourceType);
router.delete("/resource-types/:resourceTypeId", resourceTypeController.deleteResourceType);

// resource-permissions
router.get("/resource-permissions", resourcePermissionController.getAllResourcePermissions);
router.get("/resource-permissions/:resourceId", resourcePermissionController.getResourcePermissionsByResourceId);

// access-roles
router.get("/access-roles/find", accessRoleController.findAccessRoles);
router.get("/access-roles", accessRoleController.getAccessRoles);
router.get("/access-roles/:accessRoleId", accessRoleController.getAccessRoleById);
router.post("/access-roles", accessRoleController.saveAccessRole);
router.put("/access-roles/:accessRoleId", accessRoleController.updateAccessRole);
router.delete("/access-roles/:accessRoleId", accessRoleController.deleteAccessRole);

// access-role-types
router.get("/access-role-types/find", accessRoleTypeController.findAccessRoleTypes);
router.get("/access-role-types", accessRoleTypeController.getAccessRoleTypes);
router.get("/access-role-types/:accessRoleTypeId", accessRoleTypeController.getAccessRoleTypeById);
router.post("/access-role-types", accessRoleTypeController.saveAccessRoleType);
router.put("/access-role-types/:accessRoleTypeId", accessRoleTypeController.updateAccessRoleType);
router.delete("/access-role-types/:accessRoleTypeId", accessRoleTypeController.deleteAccessRoleType);

// ##### SECURITY END #####
// SUBSCRIPTION
router.get("/subscription/information", subscriptionController.getSubscriptionInformation);
router.get("/subscriptions/:type", subscriptionController.getSubscription);
router.post("/subscriptions", subscriptionController.addSubscription);

// BILLING
router.get("/billings", billingController.getBilling);
router.post("/billings", billingController.addBilling);
router.put("/billings/:billingId", billingController.updateBilling);
router.post( "/validate-credit-card/name", billingController.cardName);
router.post( "/validate-credit-card/number", billingController.cardNumber);
router.post( "/validate-credit-card/exp-date", billingController.cardExpDate);
router.post( "/validate-credit-card/cvv", billingController.cardCVV);

// DEPRECIATION
router.get("/depreciation-methods/:type/:system", depreciationController.getDepreciationMethod);
router.get("/depreciation-systems", depreciationController.getDepreciationSystems);
router.get("/depreciation-property-classes/:system", depreciationController.getPropertyClasses);

router.get("/depreciation/assets/find", depreciationController.getDepreciableAssets);
router.get("/book-depreciation", depreciationController.getBookDepreciationArr);
router.get("/tax-depreciation", depreciationController.getTaxDepreciationArr);
router.get("/depreciation/:depreciationId/:type", depreciationController.getDepreciationById);
router.post("/depreciation", depreciationController.saveDepreciation);
router.put("/depreciation/:depreciationId", depreciationController.updateDepreciation);
router.delete("/depreciation/:depreciationId/:type", depreciationController.deleteDepreciation);


export default router;