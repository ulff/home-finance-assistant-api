import express from "express";
import {config} from "./config";
import {setupRoutes} from "./Routes";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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
