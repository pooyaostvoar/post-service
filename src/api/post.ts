import express, { Request, Response } from "express";
import { upload } from "../middleware/file";
import { Post } from "../database/entity/post";
import { AppDataSource } from "../database/datasource";

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
