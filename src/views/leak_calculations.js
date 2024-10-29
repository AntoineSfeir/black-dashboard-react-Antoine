// views/leak_calculations.js
import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button, Input } from "reactstrap";

function LeakCalculations() {
  // Hardcoded data for demonstration purposes
  const leakData = [
    { Month: "January", LeakVolume: 300, LeakRate: 15, RepairCost: 5000, Severity: "High" },
    { Month: "February", LeakVolume: 250, LeakRate: 12, RepairCost: 4500, Severity: "Medium" },
    { Month: "March", LeakVolume: 400, LeakRate: 20, RepairCost: 7000, Severity: "High" },
    { Month: "April", LeakVolume: 350, LeakRate: 18, RepairCost: 6000, Severity: "Medium" },
    { Month: "May", LeakVolume: 320, LeakRate: 16, RepairCost: 5200, Severity: "Low" },
  ];

  const [filter, setFilter] = useState("All");

  // Prepare chart data for leak rate over time
  const lineData = {
    labels: leakData.map((row) => row.Month),
    datasets: [
      {
        label: "Leak Rate (m³/day)",
        data: leakData.map((row) => row.LeakRate),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Prepare bar chart data for leak volume and repair cost
  const barData = {
    labels: leakData.map((row) => row.Month),
    datasets: [
      {
        label: "Leak Volume (m³)",
        data: leakData.map((row) => row.LeakVolume),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Repair Cost ($)",
        data: leakData.map((row) => row.RepairCost),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Prepare pie chart data for leak severity distribution
  const severityCounts = leakData.reduce((acc, row) => {
    acc[row.Severity] = (acc[row.Severity] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(severityCounts),
    datasets: [
      {
        data: Object.values(severityCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  // Filter data based on selected severity
  const filteredData = filter === "All" ? leakData : leakData.filter((row) => row.Severity === filter);

  return (
    <div className="content">
      {/* Line Chart for Leak Rate */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h2">Leak Rate Over Time</CardTitle>
              <p>This chart shows the leak rate trend over different months.</p>
              <Input
                type="select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="float-right"
                style={{ width: "200px" }}
              >
                <option value="All">All Severities</option>
                <option value="High">High Severity</option>
                <option value="Medium">Medium Severity</option>
                <option value="Low">Low Severity</option>
              </Input>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={lineData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Leak Volume and Repair Cost */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Leak Volume and Repair Cost</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={barData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Pie Chart for Leak Severity Distribution */}
      <Row>
        <Col xs="12" lg="6">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Leak Severity Distribution</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Data Table for Leak Calculations */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Detailed Leak Data</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Leak Volume (m³)</th>
                    <th>Leak Rate (m³/day)</th>
                    <th>Repair Cost ($)</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: row.Severity === "High" ? "#ffcccc" : "" }}>
                      <td>{row.Month}</td>
                      <td>{row.LeakVolume}</td>
                      <td>{row.LeakRate}</td>
                      <td>{row.RepairCost}</td>
                      <td>{row.Severity}</td>
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

export default LeakCalculations;
