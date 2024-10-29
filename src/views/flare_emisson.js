// views/flare_emission.js
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button } from "reactstrap";

function FlareEmission() {
  // Hardcoded data for demonstration purposes
  const flareEmissionData = [
    { Month: "January", FlareVolume: 500, CO2Emissions: 1200, NOxEmissions: 50, MethaneEmissions: 25.2 },
    { Month: "February", FlareVolume: 450, CO2Emissions: 1100, NOxEmissions: 45, MethaneEmissions: 20.5 },
    { Month: "March", FlareVolume: 600, CO2Emissions: 1500, NOxEmissions: 60, MethaneEmissions: 30.0 },
    { Month: "April", FlareVolume: 700, CO2Emissions: 1700, NOxEmissions: 70, MethaneEmissions: 28.4 },
    { Month: "May", FlareVolume: 550, CO2Emissions: 1300, NOxEmissions: 55, MethaneEmissions: 27.0 },
  ];

  // Prepare chart data based on hardcoded data
  const lineData = {
    labels: flareEmissionData.map((row) => row.Month),
    datasets: [
      {
        label: "Flare Volume (m³)",
        data: flareEmissionData.map((row) => row.FlareVolume),
        fill: false,
        borderColor: "rgba(255, 206, 86, 1)",
      },
      {
        label: "CO2 Emissions (tons)",
        data: flareEmissionData.map((row) => row.CO2Emissions),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "NOx Emissions (kg)",
        data: flareEmissionData.map((row) => row.NOxEmissions),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Methane Emissions (tons)",
        data: flareEmissionData.map((row) => row.MethaneEmissions),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  // Data for Annual Limits and Records
  const annualLimitsData = {
    labels: ["VOC", "HRVOC", "NOx", "CO", "SO2", "H2S"],
    datasets: [
      {
        label: "Emission Limits (tons/yr)",
        data: [7.98, 3.70, 10.65, 52.84, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Data for Monitoring Records
  const monitoringRecordsData = {
    labels: ["Analyzer", "CMS", "Flow"],
    datasets: [
      {
        label: "Monitoring Uptime (%)",
        data: [80.4, 81.0, 66.1],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  // Data for Compliance Non-Compliance Records
  const complianceData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Non-Compliance Events",
        data: [0, 2, 1, 3, 0],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
              <CardTitle tag="h2">Flare Emission</CardTitle>
              <p>This page tracks and reports flare emissions.</p>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={lineData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Data Table for Flare Emission */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Detailed Flare Emission Data</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Flare Volume (m³)</th>
                    <th>CO2 Emissions (tons)</th>
                    <th>NOx Emissions (kg)</th>
                    <th>Methane Emissions (tons)</th>
                  </tr>
                </thead>
                <tbody>
                  {flareEmissionData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Month}</td>
                      <td>{row.FlareVolume}</td>
                      <td>{row.CO2Emissions}</td>
                      <td>{row.NOxEmissions}</td>
                      <td>{row.MethaneEmissions}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Annual Limits and Records */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Annual Emission Limits and Records</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={annualLimitsData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Monitoring Records */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Monitoring Records (Uptime %)</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={monitoringRecordsData} options={{ responsive: true }} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Compliance Non-Compliance Records */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Non-Compliance Events Overview</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={complianceData} options={{ responsive: true }} />
              </div>
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

export default FlareEmission;
