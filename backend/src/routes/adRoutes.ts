import { Router } from "express";
import * as adController from "@/controllers/adController";

const router = Router();

router.get("/", adController.getAll);
router.post("/", adController.create);
router.put("/:id", adController.update);
router.delete("/:id", adController.remove);

export default router;
