import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sampleData = {
  pilot_data_analysis: [
    {
      id: 1,
      timestamp: "2024-10-30T08:00:00Z",
      pilot_temperature_a: 300.5,
      pilot_temperature_b: 310.0,
      pilot_temperature_c: 295.8,
      pilot_stage_1_signal: 1,
      pilot_stage_2_signal: 0,
    },
    {
      id: 2,
      timestamp: "2024-10-31T10:00:00Z",
      pilot_temperature_a: 320.0,
      pilot_temperature_b: 315.0,
      pilot_temperature_c: 298.5,
      pilot_stage_1_signal: 1,
      pilot_stage_2_signal: 1,
    },
    {
      id: 3,
      timestamp: "2024-11-01T12:00:00Z",
      pilot_temperature_a: 305.0,
      pilot_temperature_b: 300.0,
      pilot_temperature_c: 290.0,
      pilot_stage_1_signal: 0,
      pilot_stage_2_signal: 1,
    },
  ],
  emissions_summary: [
    {
      id: 1,
      period_start: "2024-06-01T00:00:00Z",
      period_end: "2024-06-30T23:00:00Z",
      pollutant_type: "Methane/Ethane",
      op3grfla: 2.951560819777167,
      op3elfla: 0.37398867503385846,
      op2elfla: 0.17801193087639622,
      total: 3.5035614256874217,
    },
    {
      id: 2,
      period_start: "2024-06-01T00:00:00Z",
      period_end: "2024-06-30T23:00:00Z",
      pollutant_type: "VOC",
      op3grfla: 4.420378421726207,
      op3elfla: 0.17866488480107345,
      op2elfla: 0.002352368141069728,
      total: 4.601395674668351,
    },
    {
      id: 3,
      period_start: "2024-06-01T00:00:00Z",
      period_end: "2024-06-30T23:00:00Z",
      pollutant_type: "HRVOC",
      op3grfla: 3.31157187944527,
      op3elfla: 0.0032165455548414305,
      op2elfla: 0.0006749586054899984,
      total: 3.3154633836056018,
    },
  ],
  nhv_deviation_log: [
    {
      id: 1,
      flare: "OP2ELFLA",
      start_datetime: "2024-07-09T18:00:00Z",
      end_datetime: "2024-07-09T19:00:00Z",
      total_hours_below_nhv: -1038978,
      comments: "",
    },
    {
      id: 2,
      flare: "OP2ELFLA",
      start_datetime: "2024-08-09T19:00:00Z",
      end_datetime: "2024-08-09T20:00:00Z",
      total_hours_below_nhv: -1038979,
      comments: "",
    },
    {
      id: 3,
      flare: "OP2ELFLA",
      start_datetime: "2024-09-09T20:00:00Z",
      end_datetime: "2024-09-09T21:00:00Z",
      total_hours_below_nhv: -1038980,
      comments: "",
    },
  ],
};

const annualLimits = [
  {
    pollutant: "VOC",
    emission_limit: 250, // tons/year
  },
  {
    pollutant: "HRVOC",
    emission_limit: 150, // tons/year
  },
  {
    pollutant: "NOx",
    emission_limit: 100, // tons/year
  },
  {
    pollutant: "SO2",
    emission_limit: 200, // tons/year
  },
  {
    pollutant: "CO",
    emission_limit: 300, // tons/year
  },
  {
    pollutant: "H2S",
    emission_limit: 50, // tons/year
  },
];

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

function OlefinsFlareEmission() {
  const [startDate, setStartDate] = useState(new Date("2024-06-01T00:00:00Z"));
  const [endDate, setEndDate] = useState(new Date("2024-11-01T23:59:59Z"));
  const [hourlyData] = useState(generateDummyData()); // Replace with real data fetching
  const [selectedParameters, setSelectedParameters] = useState(
    parameters.map((param) => param.name)
  ); // All parameters selected by default
  const [baseParameter, setBaseParameter] = useState(parameters[0].name); // Default base parameter for ratio calculation
  const [highlightedValue, setHighlightedValue] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const filteredPilotData = sampleData.pilot_data_analysis.filter((data) => {
    const dataDate = new Date(data.timestamp);
    return dataDate >= startDate && dataDate <= endDate;
  });

  const filteredEmissionsSummary = sampleData.emissions_summary.filter(
    (data) => {
      const periodStartDate = new Date(data.period_start);
      const periodEndDate = new Date(data.period_end);
      return periodStartDate >= startDate && periodEndDate <= endDate;
    }
  );

  const filteredNHVDeviationLog = sampleData.nhv_deviation_log.filter(
    (data) => {
      const dataDate = new Date(data.start_datetime);
      return dataDate >= startDate && dataDate <= endDate;
    }
  );
  const handleParameterChange = (event) => {
    const { name, checked } = event.target;
    setSelectedParameters((prev) =>
      checked ? [...prev, name] : prev.filter((param) => param !== name)
    );
  };

  const handleBaseParameterChange = (event) => {
    setBaseParameter(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };
  const pilotDataChart = {
    labels: filteredPilotData.map((data) =>
      new Date(data.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Pilot Temperature A",
        data: filteredPilotData.map((data) => data.pilot_temperature_a),
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor:
          highlightedValue === "Pilot Temperature A"
            ? "rgba(255, 99, 132, 0.7)"
            : "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Pilot Temperature B",
        data: filteredPilotData.map((data) => data.pilot_temperature_b),
        borderColor: "rgba(153,102,255,1)",
        pointBackgroundColor:
          highlightedValue === "Pilot Temperature B"
            ? "rgba(255, 99, 132, 0.7)"
            : "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Pilot Temperature C",
        data: filteredPilotData.map((data) => data.pilot_temperature_c),
        borderColor: "rgba(255,159,64,1)",
        pointBackgroundColor:
          highlightedValue === "Pilot Temperature C"
            ? "rgba(255, 99, 132, 0.7)"
            : "rgba(255,159,64,1)",
        fill: false,
      },
    ],
  };

  const emissionsSummaryChart = {
    labels: filteredEmissionsSummary.map((data) => data.pollutant_type),
    datasets: [
      {
        label: "Total Emissions",
        data: filteredEmissionsSummary.map((data) => data.total),
        backgroundColor: filteredEmissionsSummary.map((data) =>
          highlightedValue === "Total Emissions"
            ? "rgba(255, 99, 132, 0.5)"
            : "rgba(75,192,192,0.6)"
        ),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const actualReleasesChart = {
    labels: filteredEmissionsSummary.map((data) => data.pollutant_type),
    datasets: [
      {
        label: "Actual Emissions (ton/yr)",
        data: filteredEmissionsSummary.map((data) => data.total),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the comparison chart of annual limits vs actual emissions
  const comparisonChart = {
    labels: annualLimits.map((limit) => limit.pollutant),
    datasets: [
      {
        label: "Annual Emission Limit (ton/yr)",
        data: annualLimits.map((limit) => limit.emission_limit),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual Emissions (ton/yr)",
        data: annualLimits.map((limit) => {
          const actual = filteredEmissionsSummary.find(
            (emission) => emission.pollutant_type === limit.pollutant
          );
          return actual ? actual.total : 0;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
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

  // Function to generate a sample report
  const generateReport = () => {
    alert("Automated Report Generated! (Customize logic here)");
  };

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader className="text-center">
              <CardTitle tag="h2">Olefins Flare Emission Dashboard</CardTitle>
              <p style={{ fontSize: "1.1rem" }}>
                Visual insights into flare emissions and pilot data
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
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">Olefins Flare Pilot Data</CardTitle>
              <p className="text-muted">
                Temperature data recorded from various pilot stages
              </p>
              <ButtonGroup className="mb-3">
                <Button
                  color="info"
                  onClick={() => setHighlightedValue("Pilot Temperature A")}
                >
                  Highlight Pilot Temperature A
                </Button>
                <Button
                  color="info"
                  onClick={() => setHighlightedValue("Pilot Temperature B")}
                >
                  Highlight Pilot Temperature B
                </Button>
                <Button
                  color="info"
                  onClick={() => setHighlightedValue("Pilot Temperature C")}
                >
                  Highlight Pilot Temperature C
                </Button>
              </ButtonGroup>
            </CardHeader>
            <div style={{ padding: "20px" }}>
              <Line
                data={pilotDataChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>

        {/* Actual Emissions Chart */}
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">Actual Emissions Releases</CardTitle>
              <p className="text-muted">
                Total emissions recorded for each pollutant type during the
                selected period
              </p>
            </CardHeader>
            <div style={{ padding: "20px" }}>
              <Bar
                data={actualReleasesChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>

        {/* Annual Emission Limits Section */}
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">Annual Emission Limits</CardTitle>
              <p className="text-bold">
                Emission limits (ton/year) for various pollutants
              </p>
            </CardHeader>
            <Table responsive bordered hover>
              <thead className="table-tb">
                <tr>
                  <th>Pollutant</th>
                  <th>Emission Limit (ton/yr)</th>
                </tr>
              </thead>
              <tbody>
                {annualLimits.map((limit, index) => (
                  <tr key={index}>
                    <td>{limit.pollutant}</td>
                    <td>{limit.emission_limit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
        {/* Comparison Chart: Annual Limits vs Actual Emissions */}
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">
                Annual Emission Limits vs. Actual Emissions
              </CardTitle>
              <p className="text-muted">
                Comparison of annual emission limits with actual emissions for
                each pollutant type
              </p>
            </CardHeader>
            <div style={{ padding: "20px" }}>
              <Bar
                data={comparisonChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>

        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">Emissions Summary</CardTitle>
              <p className="text-bold">
                Total emissions data by pollutant type
              </p>
              <Button
                color="info"
                className="mb-3"
                onClick={() => setHighlightedValue("Total Emissions")}
              >
                Highlight Total Emissions
              </Button>
            </CardHeader>
            <div style={{ padding: "20px" }}>
              <Line
                data={emissionsSummaryChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <Table responsive bordered hover>
              <thead className="table-tb">
                <tr>
                  <th>Period Start</th>
                  <th>Period End</th>
                  <th>Pollutant Type</th>
                  <th>OP3GRFLA</th>
                  <th>OP3ELFLA</th>
                  <th>OP2ELFLA</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmissionsSummary.map((data) => (
                  <tr
                    key={data.id}
                    className={
                      highlightedValue === "Total Emissions"
                        ? "table-warning"
                        : ""
                    }
                  >
                    <td>{new Date(data.period_start).toLocaleString()}</td>
                    <td>{new Date(data.period_end).toLocaleString()}</td>
                    <td>{data.pollutant_type}</td>
                    <td>{data.op3grfla.toFixed(2)}</td>
                    <td>{data.op3elfla.toFixed(2)}</td>
                    <td>{data.op2elfla.toFixed(2)}</td>
                    <td>{data.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">E-MACT NHV Deviation Log</CardTitle>
              <p className="text-bold">
                Records of flare gas NHV deviations below 300 BTU/SCF
              </p>
            </CardHeader>
            <Table responsive bordered hover>
              <thead className="table-tb">
                <tr>
                  <th>Flare</th>
                  <th>Start Date & Time</th>
                  <th>End Date & Time</th>
                  <th>Total Hours Below NHV</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredNHVDeviationLog.map((data) => (
                  <tr key={data.id}>
                    <td>{data.flare}</td>
                    <td>{new Date(data.start_datetime).toLocaleString()}</td>
                    <td>
                      {data.end_datetime
                        ? new Date(data.end_datetime).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{data.total_hours_below_nhv}</td>
                    <td>{data.comments || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
        <Button color="Secondary" onClick={generateReport}>
          Generate Automated Report
        </Button>
      </Row>
    </div>
  );
}

export default OlefinsFlareEmission;
