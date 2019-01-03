import { Router } from "express";

import * as confirmationController from "./authentication/credential/confirmation/confirmation.controller";
import * as credentialController from "./authentication/credential/credential.controller";
import * as permissionController from "./authorization/permission/permission.controller";
import * as resourceController from "./authorization/resource/resource.controller";
import * as accessRoleController from "./authorization/access-role/access.role.controller";
import * as accessRoleTypeController from "./authorization/access-role-type/access.role.type.controller";
import * as resourceTypeController from "./authorization/resource-type/resource.type.controller";

import * as assetController from "./asset-type/asset/asset.controller";
import * as attributeController from "./asset-type/attribute/attribute.controller";
import * as assignedAttributeController from "./asset-type/attribute/assigned-attributes/assigned.attribute.controller";
import * as assetKindController from "./asset-type/kind/asset.kind.controller";
import * as phoneController from "./site/phone/phone.controller";
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
import * as organizationProfileController from "./profile/organization/create/organization.profile.controller";
import * as personProfileController from "./profile/person/create/person.profile.controller";
import * as searchController from "./search/search.controller";
import * as partyController from "./party/party.controller";

import { upload } from "./middleware/multer.config";

import checkSession from "./middleware/check-session";

const router: Router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Troumaka API"
    });
});


// ##### SECURITY START #####
// authentication
router.post("/authentication/validate-password", credentialController.isValidPassword);
router.post("/authentication/validate-username", credentialController.isValidUsername);
router.post("/authentication/credentials", credentialController.addCredential);
router.post("/authentication/authenticate", credentialController.authenticate);
// router.post("/authentication/forgot-password", credentialController.forgetPassword);
router.post("/authentication/change-password", credentialController.changePassword);

// confirmation
router.post("/authentication/confirmations/resend", confirmationController.resendConfirmCode);
router.post("/authentication/confirmations/resend-by-username", confirmationController.resendConfirmCodeByUsername);
router.post("/authentication/confirmations/verify", confirmationController.confirmCode);
router.post("/authentication/confirmations/validate-code", confirmationController.validateCode);

// session
router.get("/sessions/is-valid-session", sessionController.isValidSession);
router.get("/sessions/logout", checkSession, sessionController.handleSessionLogOut);
// router.get("/sessions/partyId", checkSession, sessionController.getPartyId);

// permissions
router.get("/permissions", checkSession, permissionController.getPermissions);
router.get("/permissions/permissions", checkSession, permissionController.getPermissionsByArray);
router.get("/permissions/:permissionId", checkSession, permissionController.getPermissionById);
router.post("/permissions", checkSession, permissionController.savePermission);
router.put("/permissions/:permissionId", checkSession, permissionController.updatePermission);
router.delete("/permissions/:permissionId", checkSession, permissionController.deletePermission);
router.get("/permissions", permissionController.getPermissions);
router.post("/permissions/available", permissionController.getPermissionsByArray);
router.post("/permissions/assignable", permissionController.getAssignablePermissions);

router.get("/permissions/:permissionId", permissionController.getPermissionById);
router.post("/permissions", permissionController.savePermission);
router.delete("/permissions/:permissionId", permissionController.deletePermission);

// resources
router.get("/resources", checkSession, resourceController.getResources);
router.get("/resources/resources", checkSession, resourceController.getResourcesByArray);
router.get("/resources/assigned-resources", checkSession, resourceController.getAssignedResourcesByArray);
router.get("/resources/:resourceId", checkSession, resourceController.getResourceById);
router.post("/resources", checkSession, resourceController.saveResource);
router.put("/resources/:resourceId", checkSession, resourceController.updateResource);
router.delete("/resources/:resourceId", checkSession, resourceController.deleteResource);
router.get("/resources", checkSession, resourceController.getResources);
router.post("/available-resources", checkSession, resourceController.getResourcesByArray);
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



// Asset Type

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
router.post("/attributes/available", checkSession, attributeController.getAvailableAttributes);
router.post("/attributes/assigned", checkSession, attributeController.getAssignableAttributes);
router.put("/attributes/:attributeId", checkSession, attributeController.updateAttribute);
router.delete("/attributes/:attributeId", checkSession, attributeController.deleteAttribute);
// assigned-attributes
router.get("/assigned-attributes/:assetTypeClassId", checkSession, assignedAttributeController.getAssignedAttributesByClassId);
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



// PARTY

router.get("/parties/contact-info", checkSession, partyController.getContactInfo);
router.post("/parties/contact-info,", checkSession, partyController.addContactInfo);
router.put("/parties/contact-info/:contactInfoId", checkSession, partyController.updateContactInfo);
router.get("/parties/address", checkSession, partyController.getAddress);
router.post("/parties/address,", checkSession, partyController.addAddress);
router.put("/parties/address/:siteId", checkSession, partyController.updateAddress);
// user
router.get("/users/find", checkSession, userController.findUser);
router.get("/users/profile", checkSession, userController.getUserMe);
router.get("/users/:partyId", checkSession, userController.getUser);
router.get("/users", checkSession, userController.getUsers);
router.post("/users", checkSession, userController.saveUser);
router.put("/users/profile", checkSession, userController.updateUserMe);
router.put("/users/:partyId", checkSession, userController.updateUser);
router.delete("/users/:partyId", checkSession, userController.deleteUser);

// organizations
router.get("/organizations/find", checkSession, organizationController.findOrganizations);
router.get("/organizations/profile", checkSession, organizationController.getOrganizationCompany);
router.get("/organizations/:partyId", checkSession, organizationController.getOrganization);
router.get("/organizations", checkSession, organizationController.getOrganizations);
router.post("/organizations", checkSession, organizationController.saveOrganization);
router.post("/organizations/customer", checkSession, organizationController.addCustomer);
// router.post("/organizations/profiles", checkSession, organizationController.saveOrganizationCompany);
router.post("/organizations/request-access", checkSession, organizationController.saveAccessRequest);
router.put("/organizations/profile", checkSession, organizationController.updateOrganizationCompany);
router.put("/organizations/:partyId", checkSession, organizationController.updateOrganization);
router.delete("/organizations/:partyId", checkSession, organizationController.deleteOrganization);

// photos
router.get("/photos", checkSession, photoController.getPhotos);
router.post("/photos/user", checkSession, upload, photoController.savePhoto);
router.put("/photos/user", checkSession, upload, photoController.updatePhoto);



// SUBSCRIPTION && BILLING

router.get("/apps", checkSession, subscriptionController.getApps);
router.get("/subscriptions", checkSession, subscriptionController.getSubscriptions);
router.post("/subscriptions", checkSession, subscriptionController.addSubscription);
router.delete("/subscriptions/:subscriptionId", checkSession, subscriptionController.deleteSubscription);

// billing
router.get("/billings/payment-methods", checkSession, billingController.getPaymentMethods);
router.get("/billings", checkSession, billingController.getBillings);
router.get("/billings/payment-methods/is-valid", checkSession, billingController.isValidPaymentMethod);
router.get( "/billings/payment-information", checkSession, billingController.getPaymentInformation);
router.post( "/billings/payment-information", checkSession, billingController.addPaymentInformation);
router.post( "/billings/validate/card-name", checkSession, billingController.cardName);
router.post( "/billings/validate/card-number", checkSession, billingController.cardNumber);
router.post( "/billings/validate/card-exp-date", checkSession, billingController.cardExpDate);
router.post( "/billings/validate/card-cvv", checkSession, billingController.cardCVV);
router.put( "/billings/payment-information/:paymentId", checkSession, billingController.updatePaymentInformation);
router.delete( "/billings/payment-information/:paymentId", checkSession, billingController.deletePaymentInformation);


// PROFILES
router.post("/profiles/organizations", organizationProfileController.createProfileOrganization);
router.post("/profiles/persons", personProfileController.createPersonProfile);

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

// SEARCH
router.get("/search/:indexName", checkSession, searchController.search);

export default router;