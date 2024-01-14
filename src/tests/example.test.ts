import request from "supertest";
import app, { AppDataSource } from "../app";
import { Post } from "../database/entity/post";

describe("GET /", () => {
  beforeEach(async () => {
    // await AppDataSource.destroy();
    await AppDataSource.initialize();
  });
  afterEach(async () => {
    await AppDataSource.destroy();
  });

  it("should return ", async () => {
    const res = await request(app).get("/hello");
    expect(res.status).toBe(200);
    // console.log(res);
  });

  it("should create a post", async () => {
    const res = await request(app).post("/post").send({ text: "post text" });
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find();
    expect(posts.length).toEqual(1);
  });
});
