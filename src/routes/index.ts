import express from "express";
import forecastRoutes from "./forecastRoutes";
import weatherRoutes from "./weatherRoutes";

const router = express.Router();

router.use("/weather", weatherRoutes);
router.use("/forecast", forecastRoutes);

export default router;
