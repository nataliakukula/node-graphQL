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