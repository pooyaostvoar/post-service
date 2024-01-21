import express, { Express, Request, Response } from "express";

//typeorm
import "reflect-metadata";
import { Post } from "./database/entity/post";
import bodyParser from "body-parser";
import { AppDataSource } from "./database/datasource";
import { upload } from "./middleware/file";
import { postRouter } from "./api/post";

const isTesting = process.env.NODE_ENV === "test";

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

//
if (!isTesting) {
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

app.use("", postRouter);

export default app;
