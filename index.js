const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./server'); // Import your GraphQL schema definition
const resolvers = require('./resolver'); // Import your GraphQL resolvers

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog-app-graphql'); // Replace with your MongoDB connection string
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create an instance of ApolloServer with your schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Use the `start` method to start the Apollo Server
async function startApolloServer() {
  await server.start();

  // Apply middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = 3000; // Define the port for your Express server
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the Apollo Server
startApolloServer();