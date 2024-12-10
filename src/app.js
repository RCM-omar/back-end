import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/error.js";
import notFound from "./middlewares/notFound.js";
import logger from "./middlewares/logger.js";
import routes from "./routes/index.js";

console.log("first app.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(logger);
app.use(routes);

//! not found
app.use(notFound);
// ! handle error globally
app.use(errorHandler);

export default app;
