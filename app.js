import path from "node:path";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import { NotFoundError } from "./src/shared/errors/index.js";
import errorHandler from "./src/shared/middlewares/errorHandler.js";
import routes from "./src/shared/routes/index.js";

const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(routes);

app.use((req, _res, next) => {
	next(new NotFoundError(`Route ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
