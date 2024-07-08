import { Router } from "express";
import * as MC from "./message.controller.js";
import { auth } from "../../middlewares/auth/auth.js";

const router = Router()

router.get("/",auth(), MC.getAllMsgs)
router.post("/",auth(),MC.addMsg)
router.delete("/:id",auth(),MC.deleteMsg)
export default router
