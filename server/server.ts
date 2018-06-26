import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import * as webpackdevMiddleware from "webpack-dev-middleware";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(webpackdevMiddleware())