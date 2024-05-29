import express, { Express, Request, Response } from "express";

//typeorm
import "reflect-metadata";
import bodyParser from "body-parser";
import { AppDataSource } from "./database/datasource";
import { postRouter } from "./api/post";
import cors from "cors";
import { fileRouter } from "./api/file";

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
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(port, () => {
  //console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/post", postRouter);
app.use("", fileRouter);

export default app;
