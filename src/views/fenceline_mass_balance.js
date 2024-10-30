// views/fenceline_mass_balance.js
import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button, Input } from "reactstrap";

function FencelineMassBalance() {
  // Example data for fenceline mass balance
  const fencelineData = [
    { Area: "North", EmissionsIn: 1200, EmissionsOut: 1100, ClosingBalance: 100 },
    { Area: "South", EmissionsIn: 1500, EmissionsOut: 1400, ClosingBalance: 100 },
    { Area: "East", EmissionsIn: 1300, EmissionsOut: 1250, ClosingBalance: 50 },
    { Area: "West", EmissionsIn: 1400, EmissionsOut: 1350, ClosingBalance: 50 },
  ];

  const [filter, setFilter] = useState("All");

  // Prepare bar chart data for input and output comparison
  const barData = {
    labels: fencelineData.map((row) => row.Area),
    datasets: [
      {
        label: "Emissions In (kg)",
        data: fencelineData.map((row) => row.EmissionsIn),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Emissions Out (kg)",
        data: fencelineData.map((row) => row.EmissionsOut),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Prepare line chart data for closing balance over areas
  const lineData = {
    labels: fencelineData.map((row) => row.Area),
    datasets: [
      {
        label: "Closing Balance (kg)",
        data: fencelineData.map((row) => row.ClosingBalance),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  // Prepare pie chart data for distribution of closing balance
  const pieData = {
    labels: fencelineData.map((row) => row.Area),
    datasets: [
      {
        data: fencelineData.map((row) => row.ClosingBalance),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  // Filter data based on selected criteria
  const filteredData = filter === "All" ? fencelineData : fencelineData.filter((row) => row.ClosingBalance > 50);

  return (
    <div className="content">
      {/* Bar Chart for Emissions In and Out Comparison */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h2">Emissions In and Out Comparison</CardTitle>
              <p>This chart compares the emissions in and out for different fenceline areas.</p>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={barData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Line Chart for Closing Balance */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Closing Balance Over Areas</CardTitle>
              <p>This chart shows the closing balance for each fenceline area.</p>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={lineData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Pie Chart for Closing Balance Distribution */}
      <Row>
        <Col xs="12" lg="6">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Closing Balance Distribution</CardTitle>
              <p>This chart shows the distribution of the closing balance among the fenceline areas.</p>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Data Table for Fenceline Mass Balance */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Detailed Fenceline Mass Balance Data</CardTitle>
              <Input
                type="select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: "200px", marginBottom: "10px" }}
              >
                <option value="All">All Areas</option>
                <option value="HighClosingBalance">High Closing Balance (&gt; 50 kg)</option>
              </Input>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Emissions In (kg)</th>
                    <th>Emissions Out (kg)</th>
                    <th>Closing Balance (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: row.ClosingBalance > 50 ? "#4f8df0" : "" }}>
                      <td>{row.Area}</td>
                      <td>{row.EmissionsIn}</td>
                      <td>{row.EmissionsOut}</td>
                      <td>{row.ClosingBalance}</td>
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

export default FencelineMassBalance;
