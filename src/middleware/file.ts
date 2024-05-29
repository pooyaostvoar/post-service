import multer from "multer";

export const fileFolderName =
  process.env.NODE_ENV === "test" ? "uploads-test" : "uploads";

export const upload = multer({ dest: `${fileFolderName}/` });

export const uploadedFilesPath = `/home/pooya/after-life-backend/post-service/${fileFolderName}`;
