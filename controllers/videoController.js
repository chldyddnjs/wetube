import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
export const home = async (req, res) => {
    try{
    const videos = await Video.find({}).sort( {_id : -1} );
    res.render("home",{ pageTitle : "Home", videos});
    }catch(error){
        console.log(error);
        res.render("home",{ pageTitle : "Home", videos: []});
    }
}
export const search = async (req,res) => {
    const {
        query: { term:searchingBy}
    } = req;
    let videos = [];
    try{    
        videos = await Video.find({
            title: { $regex : searchingBy , $options:"i"}
        });
    }
    catch(error){
        console.log(error);
    }
    // const searchingBy = req.query.term;
    res.render("search",{ pageTitle : "Search", searchingBy, videos});
};

export const getUpload = (req,res) => 
    res.render("upload",{ pageTitle : "Upload"});

export const postUpload = async ( req, res) => {
    const { 
        body:{ title, description},
        file: { path }    
    } = req;
    const newVideo = await Video.create({
        fileUrl:path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    console.log(newVideo);
    
    //To Do: Upload and save video
    res.redirect(routes.videoDetail(newVideo));
};

export const videoDetail = async(req, res) => {
    //Url을 찾는 유일한 방법 req.params.id
    const{
        params: { id }
    }=req;
    try{
        const video = await Video.findOne({_id:id})
        .populate("creator")
        .populate("comments");
        console.log(video);
        
        res.render("videoDetail",{ pageTitle : video.title, video});
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    
    }
}
export const getEditVideo = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findOne({_id:id});
        if (video.creator !== req.user.id) {
            throw Error();
        }else{
            res.render("editVideo",{pageTitle:`Edit ${video.title}`, video});
        }
    } catch (error) {
        res.redirect(routes.home);
    }
}
    
export const postEditVideo = async (req, res) => {
    const {
      params: { id },
      body: { title, description }
    } = req;
    try {
      await Video.findOneAndUpdate({ _id: id }, { title, description });
      res.redirect(routes.videoDetail(id));
    } catch (error) {
      res.redirect(routes.home);
    }
  };

export const deletVideo = async(req,res) => {
    const {
        params: {id}
    } = req;
    try{
        await Video.findOneAndRemove({ _id : id });
    }catch(error){}
        res.redirect(routes.home);
    
}

// Resiter Video View

export const postRegisterView = async(req,res) => {
    const {
        params:{ id }
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
        res.end();
    }finally {
        res.end();
    }
}

// Add Comment

export const postAddComment = async(req,res) => {
    const {
        params: {id},
        body: {comment},
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newCommnet = await Comment.create({
            text: comment,
            creator:user.id
        });
        video.comments.push(newCommnet.id);
        video.save();
    } catch (error) {
        res.status(400);    
    }finally{
        res.end();
    }
}