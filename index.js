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