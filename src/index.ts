import express from "express";
import {setupRoutes} from "./routes";

const {
  PORT,
} = process.env;

const port = PORT || 8080;
const app = express();
setupRoutes(app);

const httpServer = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ port }`);
});

process.on('SIGTERM', () => {
  // tslint:disable-next-line:no-console
  console.log('Caught SIGTERM, shutting down.');
  httpServer.close(() => process.exit(143));
});
