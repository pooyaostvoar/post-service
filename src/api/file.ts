import express from "express";
export const fileRouter = express.Router();
import path from "path";
import { uploadedFilesPath } from "../middleware/file";

fileRouter.get("/download/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(uploadedFilesPath, fileName);

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("Not found");
    }
  });
});
