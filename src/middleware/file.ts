import multer from "multer";

export const upload = multer(
  process.env.NODE_ENV === "test"
    ? { dest: "uploads-test/" }
    : { dest: "uploads/" }
);
