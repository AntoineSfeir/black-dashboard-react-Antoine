// views/teba.js
import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button, ButtonGroup } from "reactstrap";

function TEBA() {
  // Updated data based on real-world example
  const tebaData = [
    { Unit: "OP3_OP2", EnergyDriver: "KC-3001 Process Gas Compressor", CostPerMonth: 70195, Rank: 1 },
    { Unit: "OP2_CS", EnergyDriver: "KOL-550 Propylene Refr. Compressor", CostPerMonth: 13217, Rank: 2 },
    { Unit: "OP3_HS", EnergyDriver: "FOL 710 Thermal Efficiency", CostPerMonth: 8833, Rank: 3 },
    { Unit: "OP3_CS", EnergyDriver: "KICKBACK TO PR +25 SUC DM", CostPerMonth: 3947, Rank: 4 },
    { Unit: "OP2_CS", EnergyDriver: "KOL-300 Process Gas Compressor", CostPerMonth: 3519, Rank: 5 },
  ];

  const [filter, setFilter] = useState("All");

  // Pie chart data for cost distribution
  const pieData = {
    labels: ["Top 5 CEMIS (Maint.)", "Other Bad Actors"],
    datasets: [
      {
        data: [100, 2],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Prepare bar chart data based on updated data
  const barData = {
    labels: tebaData.map((row) => row.EnergyDriver),
    datasets: [
      {
        label: "Cost per Month ($)",
        data: tebaData.map((row) => row.CostPerMonth),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  // Prepare line chart data for trends over time
  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "KC-3001 Process Gas Compressor",
        data: [65000, 67000, 70195, 68000, 70000],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Data for Top 5 Daily Trend
  const top5DailyTrendData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "KC-3001 Process Gas Compressor",
        data: [1200, 1250, 1300, 1280, 1320],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "KOL-550 Propylene Refr. Compressor",
        data: [900, 950, 920, 940, 970],
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  // Data for Monthly Report
  const monthlyReportData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Total Cost per Month ($)",
        data: [120000, 115000, 130000, 125000, 128000],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Data for 12 Month Trend
  const twelveMonthTrendData = {
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"],
    datasets: [
      {
        label: "Total Cost ($)",
        data: [120000, 125000, 130000, 128000, 127000, 126000, 125500, 129000, 131000, 128500, 127000, 130500],
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
      },
    ],
  };

  // Data for Thermal Efficiency Trend (similar to provided image)
  const thermalEfficiencyTrendData = {
    labels: [
      "Jan-14", "Feb-14", "Mar-14", "Apr-14", "May-14", "Jun-14", "Jul-14", "Aug-14", "Sep-14", "Oct-14", "Nov-14", "Dec-14", "Jan-15", "Feb-15", "Mar-15", "Apr-15", "May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15"
    ],
    datasets: [
      {
        label: "FP3 1100 Thermal Efficiency ($/Year)",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43.61, 42.45, 49.69
        ],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  // Filter data based on selected criteria
  const filteredData = filter === "All" ? tebaData : tebaData.filter((row) => row.CostPerMonth > 10000);

  return (
    <div className="content">
      {/* Bar Chart for Top Energy Bad Actors */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h2">Top Energy Bad Actors (TEBA)</CardTitle>
              <p>This page highlights the top energy bad actors within the system.</p>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={barData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Line Chart for Trends Over Time */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Energy Driver Cost Trends Over Time</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={lineData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Line Chart for Top 5 Daily Trend */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Top 5 Daily Trend</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={top5DailyTrendData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Monthly Report */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Monthly Report</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={monthlyReportData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Line Chart for 12 Month Trend */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">12 Month Trend</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={twelveMonthTrendData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Line Chart for Thermal Efficiency Trend */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">FP3 1100 Thermal Efficiency</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={thermalEfficiencyTrendData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Pie Chart for Cost Distribution */}
      <Row>
        <Col xs="12" lg="6">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Cost Distribution</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Data Table for TEBA */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Detailed TEBA Data</CardTitle>
              <ButtonGroup className="float-right">
                <Button color="info" onClick={() => setFilter("All")}>All</Button>
                <Button color="info" onClick={() => setFilter("HighCost")}>High Cost Only</Button>
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Energy Driver</th>
                    <th>Cost per Month ($)</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: row.CostPerMonth > 50000 ? "#ffcccc" : "" }}>
                      <td>{row.Unit}</td>
                      <td>{row.EnergyDriver}</td>
                      <td>{row.CostPerMonth.toLocaleString()}</td>
                      <td>{row.Rank}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Button to Generate Automated Report */}
      <Row>
        <Col xs="12">
          <Button color="primary" onClick={generateReport}>Generate Automated Report</Button>
        </Col>
      </Row>
    </div>
  );
}

export default TEBA;