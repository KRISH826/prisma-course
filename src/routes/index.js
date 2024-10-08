import {Router} from "express";
import UserRoutes from "./UserRoutes.js";
import PostRoutes from "./PostRouter.js";
import CommentRoutes from "./CommentRouter.js";

const router = Router();
router.use('/api/user', UserRoutes);
router.use('/api/post', PostRoutes);
router.use('/api/comment', CommentRoutes)


export default router;