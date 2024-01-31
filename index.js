import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone';
import { typeDefs } from "./schema.js";

//db
import db from "./_db.js";

const resolvers = {
    Query: {
        reviews: () => {return db.reviews},
        // review(parent,args,context,info)
        review(_,args){
            return db.reviews.find(review => review.id === args.id)
        },
        games: () => {return db.games},
        game(_,args){
            return db.games.find(game => game.id === args.id)
        },
        authors: () => {return db.authors},
        author(_,args){
            return db.authors.find(author => author.id === args.id)
        }
    },
    Game:{
        reviews(parent){
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Review:{
        game(parent){
            return db.games.find(game => game.id === parent.game_id)
        },
        author(parent){
            return db.authors.find(author => author.id === parent.author_id)
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter(review => review.author_id === parent.id)
        }
    }
}

//server setup

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(
    server,
    {
        port: 4000,
        cors: true,
    },
)

console.log(`🚀 Server ready at ${url}`);