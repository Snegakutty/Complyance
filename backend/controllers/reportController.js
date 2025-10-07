// backend/controllers/reportController.js
import { generatePDFBuffer } from "../utils/pdfGenerator.js";

export const generateReport = async (req, res) => {
  try {
    const { scenario_name, inputs, results, email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required to download report" });

    // Optionally: record lead / scenario to DB here

    const pdfBuffer = await generatePDFBuffer({
      scenarioName: scenario_name || "Report",
      inputs: inputs || {},
      results: results || {}
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${(scenario_name || "report").replace(/\s+/g,"_")}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};