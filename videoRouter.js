import express from "express";
import routes from "../routes";
import { videoDetail, getEditVideo,postEditVideo, deletVideo, getUpload, postUpload } from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";
const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo,postUpload);

//video Detail
videoRouter.get(routes.videoDetail(), onlyPrivate, videoDetail);

//Edit Video
videoRouter.get(routes.editVideo() , onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo() , onlyPrivate, postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deletVideo);



export default videoRouter;