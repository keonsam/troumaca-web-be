export const typeDef = `
  extend type Query {
    organizationProfile(partyId: Int!): OrganizationProfile
  }
    
  type OrganizationProfile {
    partyId: String!
  }
`;


// organizationProfile(partyId: Int!): OrganizationProfile

export const resolvers = {
  Query: {
    organizationProfile: (parent:any, {partyId}:any) => {
      return {
        partyId: "0199320f-9e84-41ff-bc6c-59fbe59e7f8c"
      }
    }
  }
};

