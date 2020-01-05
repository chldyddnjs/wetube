import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCalback} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:3000${routes.githubCallback}`
}),
    githubLoginCalback
);

passport.serializeUser(User.serializeUser()); //어떤 field가 쿠키에 포함 될 것인지 알려주는 역할을 해
passport.deserializeUser(User.deserializeUser()); //어느 사용자인지 어떻게 찾는가
