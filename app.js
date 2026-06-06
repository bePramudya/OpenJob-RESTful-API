import path from "node:path";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";

import indexRouter from "./src/routes/index.js";
import usersRouter from "./src/routes/users.js";

const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
