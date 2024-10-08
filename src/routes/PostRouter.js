import { Router } from "express";
import { createPost, deletePost, getPosts, searchPost, updatePost } from "../controllers/post.controller.js";


const router = Router();
router.get("/", getPosts);
router.post("/", createPost);
router.get("/search", searchPost)
router.put("/:id", updatePost);
router.delete("/:id", deletePost);


export default router;