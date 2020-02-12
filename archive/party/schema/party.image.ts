export const typeDef = `
  type PartyImage {
    partyImageId: String!
    partyId: String!
    imageId: String!
    name: String
    partyImageType: [PartyImageType]
  }
`;