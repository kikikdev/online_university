import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import helmet from "helmet";
import bodyParser from "body-parser";
import connectorDb from "./helper/Dbconnector";
import * as dotenv from "dotenv";
import morgan from "morgan";

import StudentRoute from "./routes/StudentRoute";
import TeacherRoute from "./routes/TeacherRoute";
import ChallengeRoute from "./routes/ChallengeRoute";
import CompletionRoute from "./routes/CompletionRoute";
import ReviewRoute from "./routes/ReviewRoute";

dotenv.config();

app.use(helmet());
app.use(bodyParser.json());
//morgan used for logging
// app.use(morgan("dev"));
app.use(morgan<Request, Response>("dev"));

const dbConnectionString: string = process.env.DB_CONNECION ?? "mongodb://localhost:27017/online_university";
const server_port = process.env.SERVER_PORT ?? "3000";

connectorDb(dbConnectionString);

//student route
app.use("/student", StudentRoute);

//teacher route
app.use("/teacher", TeacherRoute);

//challenge route
app.use("/challenge", ChallengeRoute);

//completion route
app.use("/completion", CompletionRoute);

//review route
app.use("/review", ReviewRoute);

//404 response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("REST API not found");
  } catch (error) {
    next(error);
  }
});

app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});
const port = server_port || 5000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
