import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import userRouter  from "./routers/userRouter";
import videoRouter  from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";


import "./passport";

const app = express();

const CokieStore = MongoStore(session);
console.log(process.env.COOKIE_SECRET);

app.use(helmet());
app.set("view engine","pug");
app.use("/uploads", express.static("uploads")); //multer 사용법
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(morgan("dev"));
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized:false,
    store: new CokieStore( { mongooseConnection : mongoose.connection } )
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

