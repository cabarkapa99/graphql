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
    },
    Mutation:{
        deleteReview(_,args){
            db.reviews = db.reviews.filter(review => review.id !== args.id)
            return db.reviews
        },
        deleteGame(_,args){
            db.games = db.games.filter(game => game.id !== args.id)
            return db.games
        },
        deleteAuthor(_,args){
            db.authors = db.authors.filter(author => author.id !== args.id)
            return db.authors
        },
        addGame(_,args){
            const newGame = {
                id: String(db.games.length + 1),
                ...args.game
            }
            db.games.push(newGame)
            return newGame
        },
        addReview(_,args){
            const newReview = {
                id: String(db.reviews.length + 1),
                rating: args.rating,
                content: args.content,
                game_id: args.game_id,
                author_id: args.author_id
            }
            db.reviews.push(newReview)
            return newReview
        },
        addAuthor(_,args){
            const newAuthor = {
                id: String(db.authors.length + 1),
                name: args.name,
                verified: args.verified
            }
            db.authors.push(newAuthor)
            return newAuthor
        },
        updateGame(_,args){
            db.games = db.games.map(game => {
                if(game.id === args.id){
                    return {...game, ...args.edits}
                }
                return game
            })
            return db.games.find(game => game.id === args.id)
        },
        updateReview(_,args){
            db.reviews = db.reviews.map(review => {
                if(review.id === args.id){
                    return {...review, ...args.edits}
                }
                return review
            })
            return db.reviews.find(review => review.id === args.id)
        },
        updateAuthor(_,args){
            db.authors = db.authors.map(author => {
                if(author.id === args.id){
                    return {...author, ...args.edits}
                }
                return author
            })
            return db.authors.find(author => author.id === args.id)
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