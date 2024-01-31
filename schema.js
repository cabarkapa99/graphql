export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        deleteReview(id: ID!): [Review]
        deleteGame(id: ID!): [Game]
        deleteAuthor(id: ID!): [Author]

        addGame(game: AddGameInput!): Game
        addReview(rating: Int!, content: String!, game_id: ID!, author_id: ID!): Review
        addAuthor(name: String!, verified: Boolean!): Author

        updateGame(id: ID!, edits: EditGameInput!): Game
        updateReview(id: ID!, edits: EditReviewInput!): Review
        updateAuthor(id: ID!, edits: EditAuthorInput!): Author
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    input EditGameInput {
        title: String
        platform: [String!]
    }
    input EditReviewInput {
        rating: Int
        content: String
        game_id: ID
        author_id: ID
    }
    input EditAuthorInput {
        name: String
        verified: Boolean
    }
`   

// int, float, string, boolean, ID