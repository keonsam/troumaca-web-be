import "reflect-metadata";

import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {ApolloServer} from "apollo-server-express";
import schema from "./graphql/schema";
import router from "./routes";
import session from "express-session";

const app = express();

// app.use(logger("dev"));
// app.use(cookieParser());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: false}));
// app.use("/uploads", express.static("uploads"));
// app.use(express.static(path.join(__dirname, "dist")));

const whitelist = [
  "http://localhost:4200",
  "http://ec2-18-207-220-164.compute-1.amazonaws.com:4200",
  "http://dev.troumaca.com",
  "troumaca.com",
  "troumaka.com",
  /\.troumaca\.com$/,
  /\.troumaka\.com$/
];

const graphqlPath: string = "/graphql";

// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
//       callback(undefined, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true
// };


// routes
// app.use(router);

// Uncomment to secure graphql path. not tested.
// app.use(graphqlPath, checkSession);

// and and add the session information to the request.

// app.use(cors());

const TWO_HOURS = 1000 * 60 * 60 * 60 * 2;
app.use(session({
    name: "login",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: TWO_HOURS,
        sameSite: true
    }
}));

const server = new ApolloServer({
    schema,
    context: ({req}: any) => {
        console.log(req);
        return ({ req});
    }
});

server.applyMiddleware({app, path: graphqlPath});

// catch 404 and forward to error handler
// app.use((req: any, res: any, next: any) => {
//   const err: any = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function (err: any, req: any, res: any, next: any) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.setHeader("Content-Type", "application/json");
//   res.send('{"message":"Express REST API error"}');
//   res.render("error");
// });

export default app;
