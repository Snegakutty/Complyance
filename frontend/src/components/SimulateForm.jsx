import { useState } from "react";
import API from "../services/api";

export default function SimulateForm({ onResult }) {
  const [form, setForm] = useState({
    num_ap_staff: 3, hourly_wage: 20, avg_hours_per_invoice: 0.5, monthly_invoice_volume: 1000,
    automated_cost_per_invoice: 0.15, error_rate_manual: 0.05, error_rate_auto: 0.01,
    error_cost: 25, time_horizon_months: 12, one_time_implementation_cost: 5000, min_roi_boost_factor: 1.1
  });

  function change(e) {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  }

  async function submit(e) {
    e.preventDefault();
    const res = await API.post("/simulate", form);
    onResult({ form, results: res.data });
  }

  return (
    <form onSubmit={submit} className="p-4 space-y-2">
      <label>Monthly invoices
        <input name="monthly_invoice_volume" type="number" value={form.monthly_invoice_volume} onChange={change} className="border p-1"/>
      </label>
      {/* add other inputs similarly */}
      <div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Simulate</button>
      </div>
    </form>
  );
}
