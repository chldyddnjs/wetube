import express from "express";
import routes from "../routes";
import { videoDetail, getEditVideo,postEditVideo, deletVideo, getUpload, postUpload } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload,getUpload);
videoRouter.post(routes.upload,uploadVideo,postUpload);

//video Detail
videoRouter.get(routes.videoDetail(),videoDetail);

//Edit Video
videoRouter.get(routes.editVideo() ,getEditVideo);
videoRouter.post(routes.editVideo() ,postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo,deletVideo);



export default videoRouter;