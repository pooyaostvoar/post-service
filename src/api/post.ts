import express, { Request, Response } from "express";
import { upload } from "../middleware/file";
import { Post } from "../database/entity/post";
import { AppDataSource } from "../database/datasource";

export const postRouter = express.Router();

postRouter.post(
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
