import fsExtra from "fs-extra";
import { AppDataSource } from "../database/datasource";

beforeEach(async () => {
  await AppDataSource.initialize();
});
afterEach(async () => {
  await AppDataSource.destroy();

  fsExtra.emptyDirSync(
    "/home/pooya/after-life-backend/post-service/uploads-test"
  );
});
