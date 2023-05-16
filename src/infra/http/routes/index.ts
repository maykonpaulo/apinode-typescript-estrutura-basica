import { auth } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

// MIDDLEWARES
router.use(auth);

export { router };
