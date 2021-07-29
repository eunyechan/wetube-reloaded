import express from "express";
import {
  watch,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  delecteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(delecteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
