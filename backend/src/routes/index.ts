import { Router } from "express";
import adRoutes from "@/routes/adRoutes";
import categoryRoutes from "@/routes/categoryRoutes";
import tagRoutes from "@/routes/tagRoutes";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Welcome to the Good Corner API");
});

router.use("/ads", adRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);

export default router;
