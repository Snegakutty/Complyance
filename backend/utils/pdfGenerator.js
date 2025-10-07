// backend/utils/pdfGenerator.js
import PDFDocument from "pdfkit";

export function generatePDFBuffer({ scenarioName = "Report", inputs = {}, results = {} }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", (err) => reject(err));

    doc.fontSize(20).text("Invoicing ROI Simulator", { align: "center" });
    doc.moveDown(1);
    doc.fontSize(14).text(`Scenario: ${scenarioName}`);
    doc.moveDown();

    doc.fontSize(12).text("Inputs:");
    Object.entries(inputs).forEach(([k, v]) => {
      doc.text(`  • ${k}: ${String(v)}`);
    });
    doc.moveDown();

    doc.fontSize(12).text("Results:");
    Object.entries(results).forEach(([k, v]) => {
      doc.text(`  • ${k}: ${String(v)}`);
    });

    doc.moveDown(2);
    doc.fontSize(10).text(`Generated: ${new Date().toLocaleString()}`, { align: "right" });

    doc.end();
  });
}
