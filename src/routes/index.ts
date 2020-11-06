import {Express} from "express-serve-static-core";
import settings from "./settings";
import expenses from "./expenses";

export const setupRoutes = (app: Express) => {
  app.use("/settings", settings);
  app.use("/expenses", expenses);
};
