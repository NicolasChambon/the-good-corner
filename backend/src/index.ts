import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "apollo-server";
import { AdResolver } from "./resolver/AdResolver";
import { buildSchema } from "type-graphql";

const port = 4000;

const startServer = async () => {
  try {
    await dataSource.initialize();
    console.info("Database connection established");

    const schema = await buildSchema({
      resolvers: [AdResolver],
    });

    const apolloServer = new ApolloServer({
      schema,
    });

    const { url } = await apolloServer.listen({
      port,
    });
    console.log(`🚀 Server ready at: ${url}`);
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
