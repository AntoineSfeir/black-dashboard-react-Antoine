import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line, Bar } from "react-chartjs-2";

function HIPAFlareEmission() {
  // List of parameters and their units
  const parameters = [
    { name: "Velocity", unit: "FT/S" },
    { name: "Temp", unit: "DEGF" },
    { name: "Pressure", unit: "PSIG" },
    { name: "Methane", unit: "Mole" },
    { name: "Ethane", unit: "Mole" },
    { name: "Acetylene", unit: "Mole" },
    { name: "Ethylene", unit: "Mole" },
    { name: "Propane", unit: "Mole" },
    { name: "Propylene", unit: "Mole" },
    { name: "(1,3) Butadiene", unit: "Mole" },
    { name: "1-Butane", unit: "Mole" },
    { name: "T-2-Butene", unit: "Mole" },
    { name: "C-2-Butene", unit: "Mole" },
    { name: "Isobutane", unit: "Mole" },
    { name: "Butane", unit: "Mole" },
    { name: "C5+", unit: "Mole" },
    { name: "H2S", unit: "Mole" },
    { name: "H2", unit: "Mole" },
    { name: "N2", unit: "Mole" },
    { name: "O2", unit: "Mole" },
    { name: "CO2", unit: "Mole" },
    { name: "CO", unit: "Mole" },
    { name: "H2O", unit: "Mole" },
    { name: "Calorimeter", unit: "BTU/SCF" },
  ];

  // Dummy data generator for testing
  function generateDummyData() {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourlyEntry = { hour: `${hour}:00` };
      parameters.forEach((param) => {
        hourlyEntry[param.name] = Math.random() * 100; // Random value for testing
      });
      data.push(hourlyEntry);
    }
    return data;
  }

  // Initial state for selected date range and sample data
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hourlyData] = useState(generateDummyData()); // Replace with real data fetching
  const [selectedParameters, setSelectedParameters] = useState(
    parameters.map((param) => param.name)
  ); // All parameters selected by default
  const [baseParameter, setBaseParameter] = useState(parameters[0].name); // Default base parameter for ratio calculation
  const [filterValue, setFilterValue] = useState(50); // Default filter value for highlighting

  // Handle parameter selection changes
  const handleParameterChange = (event) => {
    const { name, checked } = event.target;
    setSelectedParameters((prevSelected) =>
      checked
        ? [...prevSelected, name]
        : prevSelected.filter((param) => param !== name)
    );
  };

  // Handle base parameter change for ratio calculation
  const handleBaseParameterChange = (event) => {
    setBaseParameter(event.target.value);
  };

  // Handle filter value change
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };
  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  // Prepare data for main chart
  const chartData = {
    labels: hourlyData.map((entry) => entry.hour),
    datasets: selectedParameters.map((param, index) => ({
      label: `${param} (${parameters.find((p) => p.name === param).unit})`,
      data: hourlyData.map((entry) => entry[param]),
      fill: false,
      borderColor: `hsl(${index * 25}, 70%, 50%)`,
      tension: 0.1,
    })),
  };

  // Prepare data for ratio chart
  const ratioChartData = {
    labels: hourlyData.map((entry) => entry.hour),
    datasets: selectedParameters
      .filter((param) => param !== baseParameter)
      .map((param, index) => ({
        label: `${param} / ${baseParameter}`,
        data: hourlyData.map((entry) =>
          entry[baseParameter] !== 0
            ? (entry[param] / entry[baseParameter]).toFixed(2)
            : 0
        ),
        fill: false,
        borderColor: `hsl(${
          (index + selectedParameters.length) * 25
        }, 70%, 50%)`,
        tension: 0.1,
      })),
  };

  // Prepare data for converted lb/hr chart
  const lbHrChartData = {
    labels: hourlyData.map((entry) => entry.hour),
    datasets: parameters
      .filter((param) => param.unit === "Mole")
      .map((param, index) => ({
        label: `${param.name} (lb/hr)`,
        data: hourlyData.map((entry) =>
          (entry[param.name] * 2.20462).toFixed(2)
        ), // Conversion to lb/hr (dummy factor)
        backgroundColor: `hsl(${index * 20}, 70%, 50%)`,
      })),
  };

  return (
    <div className="content">
      {/* Date Range Selection */}
      <Row>
      <Col xs="12">
          <Card className="card-chart">
            <CardHeader className="text-center">
              <CardTitle tag="h2">HIPA Flare Emission Dashboard</CardTitle>
              <p style={{ fontSize: "1.1rem" }}>
                Visual insights into HIPA flare emissions
              </p>
            </CardHeader>
          </Card>
        </Col>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">Select Date Range</CardTitle>
            </CardHeader>
            <div style={{ padding: "20px" }}>
              <Row>
                <Col md="6" className="mb-3">
                  <label className="fw-bold">Start Date & Time</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-control"
                  />
                </Col>
                <Col md="6" className="mb-3">
                  <label className="fw-bold">End Date & Time</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-control"
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      {/* Parameter Selection */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Filter Parameters</CardTitle>
              <p>
                Select the parameters to be displayed in the chart and table.
              </p>
            </CardHeader>
            <CardBody>
              <FormGroup check>
                {parameters.map((param, idx) => (
                  <Label key={idx} check>
                    <Input
                      type="checkbox"
                      name={param.name}
                      checked={selectedParameters.includes(param.name)}
                      onChange={handleParameterChange}
                    />{" "}
                    {param.name} ({param.unit})
                  </Label>
                ))}
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Graph Section */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Hourly Data Chart</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Base Parameter Selection for Ratios */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Select Base Parameter for Ratios</CardTitle>
              <p>
                Select the base parameter to calculate ratios against other
                parameters.
              </p>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="baseParameter">Base Parameter</Label>
                <Input
                  type="select"
                  id="baseParameter"
                  value={baseParameter}
                  onChange={handleBaseParameterChange}
                >
                  {parameters.map((param, idx) => (
                    <option key={idx} value={param.name}>
                      {param.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Ratio Graph Section */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">
                Ratio Chart (Relative to {baseParameter})
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={ratioChartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* lb/hr Graph Section */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h4">Converted lb/hr Chart</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar
                  data={lbHrChartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Filter Value Selection */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Filter Value for Highlighting</CardTitle>
              <p>
                Set the value above which the data will be highlighted in the
                table.
              </p>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="filterValue">Filter Value</Label>
                <Input
                  type="number"
                  id="filterValue"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  className="form-control"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Hourly Data Table */}
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Hourly Data Table</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Hour</th>
                    {parameters
                      .filter((param) =>
                        selectedParameters.includes(param.name)
                      )
                      .map((param, idx) => (
                        <th key={idx}>
                          {param.name} ({param.unit})
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {hourlyData.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.hour}</td>
                      {parameters
                        .filter((param) =>
                          selectedParameters.includes(param.name)
                        )
                        .map((param, idx) => (
                          <td
                            key={idx}
                            style={{
                              backgroundColor:
                                entry[param.name] > filterValue
                                  ? "#4f8df0"
                                  : "inherit",
                            }}
                          >
                            {typeof entry[param.name] === "number"
                              ? entry[param.name].toFixed(2)
                              : entry[param.name]}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Button color="Primary" onClick={generateReport}>
          Generate Automated Report
        </Button>
      </Row>
    </div>
  );
}

export default HIPAFlareEmission;
