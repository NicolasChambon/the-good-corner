import { Router } from "express";
import * as tagController from "@/controllers/tagController";

const router = Router();

router.get("/", tagController.getAll);
router.post("/", tagController.create);
router.put("/:id", tagController.update);
router.delete("/:id", tagController.remove);

export default router;
