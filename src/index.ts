import express from "express";
import {config} from "./config";
import {setupRoutes} from "./Routes";

const app = express();
setupRoutes(app);

const httpServer = app.listen(config.port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ config.port }`);
});

process.on('SIGTERM', () => {
  // tslint:disable-next-line:no-console
  console.log('Caught SIGTERM, shutting down.');
  httpServer.close(() => process.exit(143));
});
