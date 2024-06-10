import { DataSource } from "typeorm";
import { Post } from "./entity/post";

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        name: "default",
        type: "better-sqlite3",
        database: ":memory:",
        entities: [Post],
        synchronize: true,
        dropSchema: true,
      }
    : {
        type: "postgres",
        host: "db",
        port: 5434,
        username: "route_admin",
        password: "route_admin",
        database: "post_db",
        synchronize: true,
        entities: [Post],
      }
);
