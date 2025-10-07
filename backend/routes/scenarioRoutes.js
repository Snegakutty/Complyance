import express from "express";
import {
  createScenario,
  getAllScenarios,
  getScenarioById,
  deleteScenario
} from "../controllers/scenarioController.js";

const router = express.Router();

router.post("/", createScenario);   // Save scenario
router.get("/", getAllScenarios);   // Get all
router.get("/:id", getScenarioById); // Get single
router.delete("/:id", deleteScenario); // Delete

export default router;
