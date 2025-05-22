import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "apollo-server";
import { AdResolver } from "./resolver/AdResolver";
import { CategoryResolver } from "./resolver/CategoryResolver";
import { TagResolver } from "./resolver/TagResolver";
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.API_PORT || 3000;

const startServer = async () => {
  try {
    await dataSource.initialize();
    console.info("Database connection established");

    const schema = await buildSchema({
      resolvers: [AdResolver, CategoryResolver, TagResolver],
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
