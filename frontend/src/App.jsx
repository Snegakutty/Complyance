import { useState } from "react";
import API from "./services/api";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    num_ap_staff: 3,
    hourly_wage: 20,
    avg_hours_per_invoice: 0.5,
    monthly_invoice_volume: 1000,
    automated_cost_per_invoice: 0.15,
    error_rate_manual: 0.05,
    error_rate_auto: 0.01,
    error_cost: 25,
    time_horizon_months: 12,
    one_time_implementation_cost: 5000,
    min_roi_boost_factor: 1.1
  });

  const [results, setResults] = useState(null);

  function handleChange(e) {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  }

  async function simulate(e) {
    e.preventDefault();
    const res = await API.post("/simulate", form);
    setResults(res.data);
  }

  async function saveScenario() {
    if (!results) return alert("Run simulation first!");
    await API.post("/scenarios", {
      scenario_name: "My Scenario",
      inputs: form,
      results
    });
    alert("Scenario saved!");
  }

  async function downloadPDF() {
    if (!results) return alert("Run simulation first!");
    const payload = {
      scenario_name: "ROI Report",
      inputs: form,
      results,
      email: "you@example.com"
    };
    const res = await API.post("/report/generate", payload, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ROI_Report.pdf";
    a.click();
  }

  return (
    <div className="app-container">
      <h1>Invoicing ROI Simulator</h1>

      <form onSubmit={simulate} className="form-box">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label>{key.replace(/_/g, " ")}</label>
            <input
              type="number"
              name={key}
              value={form[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="simulate">Simulate</button>
      </form>

      {results && (
        <div className="results">
          <h3>Simulation Results</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
          <div className="action-buttons">
            <button onClick={saveScenario}>Save Scenario</button>
            <button onClick={downloadPDF}>Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}
