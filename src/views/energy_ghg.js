// views/energy_ghg.js
import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Button, Table, Card, CardHeader, CardBody, CardTitle, Row, Col, ButtonGroup } from "reactstrap";

function EnergyGHG() {
  // Hardcoded data for demonstration purposes
  const actualData = [
    { Month: "January", EnergyUsage: 5000, Scope1: 40, Scope2: 30, Scope3: 30 },
    { Month: "February", EnergyUsage: 6000, Scope1: 42, Scope2: 28, Scope3: 30 },
    { Month: "March", EnergyUsage: 7000, Scope1: 41, Scope2: 30, Scope3: 29 },
    { Month: "April", EnergyUsage: 8000, Scope1: 43, Scope2: 27, Scope3: 30 },
    { Month: "May", EnergyUsage: 9000, Scope1: 45, Scope2: 25, Scope3: 30 },
  ];

  const targetData = [
    { Month: "January", EnergyUsage: 4800, GHGIntensity: 200 },
    { Month: "February", EnergyUsage: 5900, GHGIntensity: 220 },
    { Month: "March", EnergyUsage: 6800, GHGIntensity: 210 },
    { Month: "April", EnergyUsage: 7700, GHGIntensity: 230 },
    { Month: "May", EnergyUsage: 8800, GHGIntensity: 240 },
  ];

  // Prepare chart data based on hardcoded data
  const barData = {
    labels: actualData.map((row) => row.Month),
    datasets: [
      {
        label: "Actual Energy Usage (kWh)",
        data: actualData.map((row) => row.EnergyUsage),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Target Energy Usage (kWh)",
        data: targetData.map((row) => row.EnergyUsage),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: targetData.map((row) => row.Month),
    datasets: [
      {
        label: "GHG Intensity (tCO2e)",
        data: targetData.map((row) => row.GHGIntensity),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const pieData = {
    labels: ["Scope 1", "Scope 2", "Scope 3"],
    datasets: [
      {
        data: [
          actualData[0].Scope1,
          actualData[0].Scope2,
          actualData[0].Scope3,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Energy & GHG Metrics</h5>
                  <CardTitle tag="h2">Monthly Overview</CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                    <Button
                      tag="label"
                      className="btn-simple"
                      color="info"
                      size="sm"
                      onClick={() => {}}
                    >
                      Energy Usage
                    </Button>
                    <Button
                      tag="label"
                      className="btn-simple"
                      color="info"
                      size="sm"
                      onClick={() => {}}
                    >
                      GHG Intensity
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={barData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg="6" md="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">GHG Intensity Over Time</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={lineData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" md="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">GHG Emissions Breakdown</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Data Table for Energy and GHG Metrics */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Detailed Data</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Actual Energy Usage (kWh)</th>
                    <th>Target Energy Usage (kWh)</th>
                    <th>GHG Intensity (tCO2e)</th>
                    <th>Scope 1 (%)</th>
                    <th>Scope 2 (%)</th>
                    <th>Scope 3 (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {actualData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Month}</td>
                      <td>{row.EnergyUsage}</td>
                      <td>{targetData[index] ? targetData[index].EnergyUsage : "N/A"}</td>
                      <td>{targetData[index] ? targetData[index].GHGIntensity : "N/A"}</td>
                      <td>{row.Scope1}</td>
                      <td>{row.Scope2}</td>
                      <td>{row.Scope3}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Button to Generate Automated Report */}
      <Button color="primary" onClick={generateReport}>Generate Automated Report</Button>
    </div>
  );
}

export default EnergyGHG;
