export const typeDef = `
  extend type Query {
    assetNameType(assetNameTypeId: String!): AssetNameType
  }
  
  type AssetNameType {
    assetNameTypeId: String
    name: String!
    canonicalName: String
    description: String
    version: String
    ownerPartyId: String
    dateModified: String
  }
`;

export const resolvers = {
  Query: {
    assetNameType: () => {  }
  }
};
