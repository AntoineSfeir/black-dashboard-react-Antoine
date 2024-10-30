// views/environmental_mass_balance.js
import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button, Input } from "reactstrap";

function EnvironmentalMassBalance() {
  // Updated data based on CSV files (example data)
  const massBalanceData = [
    { Unit: "OP2", Input: 5200, Output: 5000, ClosingBalance: 200 },
    { Unit: "OP3", Input: 6300, Output: 6200, ClosingBalance: 100 },
    { Unit: "BD3", Input: 4600, Output: 4500, ClosingBalance: 100 },
    { Unit: "CPIX", Input: 7100, Output: 6900, ClosingBalance: 200 },
    { Unit: "HT3", Input: 5400, Output: 5300, ClosingBalance: 100 },
    { Unit: "IRU", Input: 5300, Output: 5100, ClosingBalance: 200 },
  ];

  const [filter, setFilter] = useState("All");

  // Prepare bar chart data for input and output comparison
  const barData = {
    labels: massBalanceData.map((row) => row.Unit),
    datasets: [
      {
        label: "Input (tons)",
        data: massBalanceData.map((row) => row.Input),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Output (tons)",
        data: massBalanceData.map((row) => row.Output),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Prepare line chart data for closing balance over units
  const lineData = {
    labels: massBalanceData.map((row) => row.Unit),
    datasets: [
      {
        label: "Closing Balance (tons)",
        data: massBalanceData.map((row) => row.ClosingBalance),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  // Prepare pie chart data for distribution of closing balance
  const pieData = {
    labels: massBalanceData.map((row) => row.Unit),
    datasets: [
      {
        data: massBalanceData.map((row) => row.ClosingBalance),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  // Filter data based on selected criteria
  const filteredData = filter === "All" ? massBalanceData : massBalanceData.filter((row) => row.ClosingBalance > 150);

  return (
    <div className="content">
      {/* Bar Chart for Input and Output Comparison */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h2">Input and Output Comparison</CardTitle>
              <p>This chart compares the input and output values for different units.</p>
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
              <CardTitle tag="h4">Closing Balance Over Units</CardTitle>
              <p>This chart shows the closing balance for each unit.</p>
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
              <p>This chart shows the distribution of the closing balance among the units.</p>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Data Table for Mass Balance */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Detailed Mass Balance Data</CardTitle>
              <Input
                type="select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: "200px", marginBottom: "10px" }}
              >
                <option value="All">All Units</option>
                <option value="HighClosingBalance">High Closing Balance (&gt; 150 tons)</option>
              </Input>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Input (tons)</th>
                    <th>Output (tons)</th>
                    <th>Closing Balance (tons)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: row.ClosingBalance > 150 ? "#4f8df0" : "" }}>
                      <td>{row.Unit}</td>
                      <td>{row.Input}</td>
                      <td>{row.Output}</td>
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

export default EnvironmentalMassBalance;
