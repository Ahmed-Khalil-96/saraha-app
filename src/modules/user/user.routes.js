import { Router } from "express";
import * as UC from "./user.controller.js";

const router = Router()


router.get("/",UC.getAllUsers)

router.post("/",UC.addUser)
router.post("/confirmEmail/:token",UC.confirmEmail)
router.post("/login",UC.logIn)

export default router