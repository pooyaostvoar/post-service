import express, { Express, Request, Response } from "express";

//typeorm
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./database/entity/post";
import multer from "multer";
import bodyParser from "body-parser";

const upload = multer({ dest: "uploads/" });

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
        host: "localhost",
        port: 5434,
        username: "route_admin",
        password: "route_admin",
        database: "test",
        synchronize: true,
        entities: [Post],
      }
);

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

//
if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
}

const app: Express = express();
const port = 3003;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  //console.log(`[server]: Server is running at http://localhost:${port}`);
});
app.get("/hello", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post(
  "/post",
  upload.single("media"),
  async (req: Request, res: Response) => {
    const post = new Post();
    post.media = req.file?.filename ?? "";
    post.text = req.body.text;
    const savedPost = await AppDataSource.manager.save(post);
    res.send(savedPost);
  }
);
export default app;
