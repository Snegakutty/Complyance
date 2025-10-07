import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const {
    num_ap_staff,
    hourly_wage,
    avg_hours_per_invoice,
    monthly_invoice_volume,
    automated_cost_per_invoice,
    error_rate_manual,
    error_rate_auto,
    error_cost,
    time_horizon_months,
    one_time_implementation_cost,
    min_roi_boost_factor
  } = req.body;

  const labor_cost_manual =
    num_ap_staff * hourly_wage * avg_hours_per_invoice * monthly_invoice_volume;
  const auto_cost = monthly_invoice_volume * automated_cost_per_invoice;
  const error_savings =
    (error_rate_manual - error_rate_auto) * monthly_invoice_volume * error_cost;

  const monthly_savings =
    ((labor_cost_manual + error_savings) - auto_cost) * min_roi_boost_factor;
  const cumulative_savings = monthly_savings * time_horizon_months;
  const net_savings = cumulative_savings - one_time_implementation_cost;
  const payback_months = one_time_implementation_cost / monthly_savings;
  const roi_percentage = (net_savings / one_time_implementation_cost) * 100;

  res.json({
    monthly_savings,
    cumulative_savings,
    net_savings,
    payback_months,
    roi_percentage
  });
});

export default router;
