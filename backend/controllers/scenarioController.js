import Scenario from "../models/Scenario.js";

// POST /scenarios — Save a new scenario
export const createScenario = async (req, res) => {
  try {
    const scenario = new Scenario(req.body);
    await scenario.save();
    res.status(201).json(scenario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /scenarios — Fetch all scenarios
export const getAllScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find().sort({ createdAt: -1 });
    res.json(scenarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /scenarios/:id — Fetch single scenario
export const getScenarioById = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (!scenario) return res.status(404).json({ message: "Scenario not found" });
    res.json(scenario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /scenarios/:id — Delete a scenario
export const deleteScenario = async (req, res) => {
  try {
    await Scenario.findByIdAndDelete(req.params.id);
    res.json({ message: "Scenario deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
