import {Express} from "express-serve-static-core";
import members from "./members";
import expenses from "./expenses";

export const setupRoutes = (app: Express) => {
  app.use("/members", members);
  app.use("/expenses", expenses);
};
