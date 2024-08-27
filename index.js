import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        review(_, args) {
            return db.reviews.find((rev) => rev.id === args.id)
        },
        game(_, args) {
            return db.games.find((g) => g.id === args.id)
        },
        author(_, args) {
            return db.authors.find((au) => au.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.filter((a) => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.filter((g) => g.id === parent.game_id)
        }
    }
};

// server setup
const server = new ApolloServer({
typeDefs,
resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 }
});

console.log('server ready at port 5000');