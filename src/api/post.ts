import express, { Request, Response } from "express";
import { upload } from "../middleware/file";
import { Post } from "../database/entity/post";
import { AppDataSource } from "../database/datasource";
import fetch from "node-fetch";

export const postRouter = express.Router();

postRouter.post(
  "",
  upload.single("media"),
  async (req: Request, res: Response) => {
    const post = new Post();
    post.media = req.file?.filename ?? "";
    post.text = req.body.text;
    const savedPost = await AppDataSource.manager.save(post);
    res.send(savedPost);
  }
);

postRouter.get("", async (req: Request, res: Response) => {
  console.log(JSON.stringify(req.headers));
  const response = await fetch("http://user:3004/auth-user", {
    method: "GET",
    headers: { cookie: JSON.parse(JSON.stringify(req.headers)).cookie },
  });

  const postRepository = AppDataSource.getRepository(Post);
  res.send(await postRepository.find());
});

postRouter.get("/:id", async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const posts = await postRepository.find({
    where: { id: Number(req.params.id) },
  });
  if (posts.length) {
    res.send(posts[0]);
  } else {
    res.send({});
  }
});
