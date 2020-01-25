import "reflect-metadata";

import express from "express";
// import path from "path";
import logger from "morgan";
import cors from "cors";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import {ApolloServer} from "apollo-server-express";
// import schema from "./graphql/schema";
// import router from "./routes";
import session from "express-session";
import { buildSchema } from "type-graphql";
import RESOLVERS from "./graphql/resolvers";
import * as helmet from "helmet";
const app = express();

app.use(logger("dev"));
// app.use(helmet.hidePoweredBy({ setTo: "PHP 7.3.9" }));
// helmet.frameguard({action: "deny"});
// helmet.xssFilter();
// helmet.noSniff();
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

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(undefined, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
};


// app.use(cors(corsOptions));
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

// What's the point of making this an async function
async function bootstrap() {

    const schema = await buildSchema({
        resolvers: RESOLVERS,
    });
    const server = new ApolloServer({
        schema,
        context: ({req}: any) => {
            return ({ req});
        }
    });

    server.applyMiddleware({
        app,
        path: graphqlPath,
        cors: false,
    });
}

bootstrap();
export default app;
