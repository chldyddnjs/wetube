import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest : "uploads/videos/"});
const multerAvatar = multer({dest:"upload/avatar/"})
export const localsMiddleware = (req,res,next) => {
    res.locals.siteName ="fuckers";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;

    console.log(req.USER);
    
    next();
};

export const onlyPublic = (req,res,next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else{
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(routes.home);
    }
  };

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar =  multerAvatar.single("avatar");