import request from "supertest";
import { Post } from "../database/entity/post";
import "./init";
import { AppDataSource } from "../database/datasource";
import app from "../app";

describe("GET /", () => {
  it("should create a post", async () => {
    const res = await request(app)
      .post("/post")
      .field("text", "post text")
      .attach(
        "media",
        "/home/pooya/after-life-backend/post-service/src/tests/post-file.png"
      );
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find();
    expect(posts.length).toEqual(1);
    const fs = require("fs");

    fs.readdir(
      "/home/pooya/after-life-backend/post-service/uploads-test",
      (err: any, files: any) => {
        expect(files.length).toEqual(1);
      }
    );
  });
});
