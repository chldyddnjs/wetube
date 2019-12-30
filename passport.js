import passport from "passport";
import User from ".models/User";

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); //어떤 field가 쿠키에 포함 될 것인지 알려주는 역할을 해
passport.deserializeUser(User.deserializeUser()); //어느 사용자인지 어떻게 찾는가
