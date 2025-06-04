"use client"

import { useState } from "react"

const UserReports = () => {
  const [reportType, setReportType] = useState("crops")
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <div className="dashboard-reports">
      <div className="section-header">
        <h2>Reports</h2>
        <div className="report-filters">
          <select className="report-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="crops">Crop Reports</option>
            <option value="expenses">Expense Reports</option>
            <option value="yield">Yield Reports</option>
          </select>
          <select className="report-select" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn">Generate Report</button>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <h3 className="report-title">Crop Yield</h3>
          <div className="report-placeholder">
            <p>Crop yield chart will be displayed here</p>
          </div>
        </div>

        <div className="report-card">
          <h3 className="report-title">Expenses</h3>
          <div className="report-placeholder">
            <p>Expenses chart will be displayed here</p>
          </div>
        </div>

        <div className="report-card">
          <h3 className="report-title">Revenue</h3>
          <div className="report-placeholder">
            <p>Revenue chart will be displayed here</p>
          </div>
        </div>

        <div className="report-card">
          <h3 className="report-title">Profit Margin</h3>
          <div className="report-placeholder">
            <p>Profit margin chart will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="report-note">
        <p>
          Note: The reporting feature is currently in beta. More detailed analytics will be available in the next
          update.
        </p>
      </div>
    </div>
  )
}

export default UserReports
