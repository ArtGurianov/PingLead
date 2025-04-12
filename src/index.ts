import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { webhookRequestHandler } from "./webhookRequestHandler";
import { APP_PORT, WEBHOOK_PATH } from "./config/tgConfig";
import { sendData } from "./api/sendData";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.post(WEBHOOK_PATH, webhookRequestHandler);
app.post("/sendData", sendData);

app.listen(APP_PORT, function () {
  console.log(`Started on port ${APP_PORT}`);
});
