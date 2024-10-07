import { Router } from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/', getUser);
router.delete('/:id', deleteUser);

export default router;