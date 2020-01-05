import express from "express";
import passport from "passport";
import routes from "../routes";
import { search, home } from "../controllers/videoController";
import { logout, getJoin, postJoin, getLogin, postLogin, githubLogin, postGithubLogin } from "../controllers/userController";
import {onlyPublic} from "../middlewares"; 
const globalRouter =express.Router();


globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.githubCallback, githubLogin);
globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", { failurlRedirect : "/login"}),
    postGithubLogin
    );
export default globalRouter;