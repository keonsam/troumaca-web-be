import "reflect-metadata";

import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// middleware
import checkAccess from "./middleware/access-check";

import router from "./routes";

const app = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: false}));
app.use(express.static(path.join(__dirname, "dist")));
const whitelist = ["http://localhost:4200", "http://ec2-18-207-220-164.compute-1.amazonaws.com:4200", "http://dev.troumaca.com"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
      if (origin === undefined || whitelist.indexOf(origin) !== -1) {
          callback(undefined, true);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
};
app.use(cors(corsOptions));
// app.use(checkAccess);

// routes
app.use(router);

// and and add the session information to the request.

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.setHeader("Content-Type", "application/json");
  res.send('{"message":"Express REST API error"}');
  res.render("error");
});

export default app;
