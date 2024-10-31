import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { saveAs } from "file-saver";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // Import CircularProgressbar and buildStyles
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
} from "reactstrap";
import { chartExample1 } from "variables/charts.js";

function Dashboard(props) {
  const [bigChartData, setBigChartData] = useState("data1");
  const [filter, setFilter] = useState("All");
  const [emissionsLevel, setEmissionsLevel] = useState(75); // Initial emission level

  const setBgChartData = (name) => {
    setBigChartData(name);
  };

  const filterRows = (severity) => setFilter(severity);

  const alerts = [
    {
      problemArea: "Furnace 44",
      reportedBy: "Deer Park",
      location: "Refinery Zone A",
      description: "112°C under recommended temperature, raising emissions.",
      severity: "High",
      severityColor: "red",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
    {
      problemArea: "Pump 32",
      reportedBy: "Baytown",
      location: "Pump Station 5",
      description: "Leak detected, potential safety risk.",
      severity: "Medium",
      severityColor: "orange",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
    {
      problemArea: "Compressor 19",
      reportedBy: "Pasadena",
      location: "Compressor Room 4",
      description: "Frequent pressure fluctuations affecting system stability.",
      severity: "Low",
      severityColor: "green",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
    {
      problemArea: "Tank 78",
      reportedBy: "Deer Park",
      location: "Storage Area 3",
      description: "Increased vapor emissions due to seal degradation.",
      severity: "High",
      severityColor: "red",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
    {
      problemArea: "Pipe 34",
      reportedBy: "Baytown",
      location: "Pipeline 12",
      description: "Corrosion detected on pipe surface, requires inspection.",
      severity: "Medium",
      severityColor: "orange",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
    {
      problemArea: "Furnace 61",
      reportedBy: "Deer Park",
      location: "Refinery Zone B",
      description: "Gas leak detected, potential for increased emissions.",
      severity: "High",
      severityColor: "red",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
    {
      problemArea: "Valve A9",
      reportedBy: "Pasadena",
      location: "Processing Unit 1",
      description:
        "Valve experiencing intermittent failures, impacting flow rates.",
      severity: "Medium",
      severityColor: "orange",
      iconClass: "tim-icons icon-alert-circle-exc",
    },
  ];

  const [modal, setModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Location");

  // Toggles modal for alert details
  const toggleModal = () => setModal(!modal);

  // Search alerts based on search term
  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Export alerts to CSV
  const exportAlerts = () => {
    const csvContent = [
      ["Problem Area", "Reported By", "Location", "Description", "Severity"],
      ...alerts.map((alert) => [
        alert.problemArea,
        alert.reportedBy,
        alert.location,
        alert.description,
        alert.severity,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "alerts_report.csv");
  };

  // Function to open alert details in modal
  const openAlertDetails = (alert) => {
    setSelectedAlert(alert);
    toggleModal();
  };

  // Sort alerts based on selected option
  const sortedAlerts = [...alerts].sort((a, b) =>
    sortOption === "Location"
      ? a.location.localeCompare(b.location)
      : a.problemArea.localeCompare(b.problemArea)
  );

  // Function to simulate real-time emissions updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulating real-time data updates, e.g., by fetching data from API
      const newEmissionsLevel = Math.floor(Math.random() * 100); // Replace with actual data source
      setEmissionsLevel(newEmissionsLevel);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Sample data for anomaly trends (customize based on actual data source)
  const anomalyData = (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(255, 0, 0, 0.3)");
    gradientStroke.addColorStop(0.4, "rgba(255, 69, 0, 0.1)");
    gradientStroke.addColorStop(0, "rgba(255, 69, 0, 0)"); // gradient red tones

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "Anomaly Count",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#ff0000",
          borderWidth: 2,
          pointBackgroundColor: "#ff0000",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#ff0000",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 3,
          data: [10, 15, 8, 12, 14, 9, 7, 15, 12, 10, 6, 11], // Sample anomaly data
        },
      ],
    };
  };

  const anomalyOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(255,0,0,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 20,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(255,0,0,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  };

  // Sample data for emissions and production output
  const emissionsProductionData = (canvas) => {
    const ctx = canvas.getContext("2d");

    // Gradient for emissions data
    const emissionsGradient = ctx.createLinearGradient(0, 230, 0, 50);
    emissionsGradient.addColorStop(1, "rgba(255, 0, 0, 0.3)");
    emissionsGradient.addColorStop(0.4, "rgba(255, 69, 0, 0.1)");
    emissionsGradient.addColorStop(0, "rgba(255, 69, 0, 0)");

    // Gradient for production data
    const productionGradient = ctx.createLinearGradient(0, 230, 0, 50);
    productionGradient.addColorStop(1, "rgba(29, 140, 248, 0.2)");
    productionGradient.addColorStop(0.4, "rgba(29, 140, 248, 0.1)");
    productionGradient.addColorStop(0, "rgba(29, 140, 248, 0)");

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "Emissions (tons)",
          fill: true,
          backgroundColor: emissionsGradient,
          borderColor: "#ff0000",
          borderWidth: 2,
          pointBackgroundColor: "#ff0000",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#ff0000",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 3,
          yAxisID: "y-axis-emissions",
          data: [50, 60, 55, 70, 65, 60, 75, 80, 70, 85, 80, 75], // Sample emissions data
        },
        {
          label: "Production Output (units)",
          fill: true,
          backgroundColor: productionGradient,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 3,
          yAxisID: "y-axis-production",
          data: [100, 110, 105, 115, 120, 125, 130, 135, 130, 125, 120, 115], // Sample production data
        },
      ],
    };
  };

  // Options for the emissions vs. production chart
  const correlationOptions = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
        fontColor: "#9a9a9a",
      },
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          id: "y-axis-emissions",
          type: "linear",
          position: "left",
          ticks: {
            fontColor: "#ff0000",
            beginAtZero: true,
            suggestedMax: 100,
          },
          gridLines: {
            drawBorder: false,
            color: "rgba(255,0,0,0.1)",
          },
        },
        {
          id: "y-axis-production",
          type: "linear",
          position: "right",
          ticks: {
            fontColor: "#1f8ef1",
            beginAtZero: true,
            suggestedMax: 150,
          },
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(0,0,0,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontColor: "#9a9a9a",
            padding: 20,
          },
        },
      ],
    },
  };


// Sample equipment data with coordinates and alert levels
const equipmentData = [
  {
    id: 1,
    name: "Furnace 44",
    location: [29.7604, -95.3698], // Houston coordinates
    alertLevel: "High",
  },
  {
    id: 2,
    name: "Pump 32",
    location: [29.7499, -95.3584], // Nearby location
    alertLevel: "Medium",
  },
  {
    id: 3,
    name: "Compressor 19",
    location: [29.7614, -95.3575],
    alertLevel: "Low",
  },
];

// Custom icons based on alert level
const icons = {
  High: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2107/2107845.png",
    iconSize: [25, 25],
  }),
  Medium: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    iconSize: [25, 25],
  }),
  Low: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    iconSize: [25, 25],
  }),
};


  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Emissions MTD</h5>
                    <CardTitle tag="h2">Current Predictions</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        Emissions by Type
                      </Button>
                      <Button
                        color="info"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        Release Trends
                      </Button>
                      <Button
                        color="info"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        Monthly Targets
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* Additional cards for data visualization */}
          {/* Task section */}
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <CardTitle tag="h4">Tasks</CardTitle>
              </CardHeader>
              <CardBody style={{ maxHeight: "400px", overflowY: "auto" }}>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>Inspect Pipeline 12 for Corrosion</td>
                        <td className="td-actions text-right">
                          <Button color="link" id="tooltip9" type="button">
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip9"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>Calibrate Emission Sensors in Refinery Zone A</td>
                        <td className="td-actions text-right">
                          <Button color="link" id="tooltip10" type="button">
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip10"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>Prepare Monthly Safety Inspection Report</td>
                        <td className="td-actions text-right">
                          <Button color="link" id="tooltip11" type="button">
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip11"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>Review Compliance Logs for Emission Targets</td>
                        <td className="td-actions text-right">
                          <Button color="link" id="tooltip12" type="button">
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip12"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          Update Training Materials on Leak Detection Procedures
                        </td>
                        <td className="td-actions text-right">
                          <Button color="link" id="tooltip13" type="button">
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip13"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>Update PinHole Leak Documentation</td>
                        <td className="td-actions text-right">
                          <Button color="link" id="tooltip1" type="button">
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip1"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      {/* Repeat tasks */}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* Alerts Section */}
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <CardTitle tag="h4">Alerts & Notifications</CardTitle>
                <ButtonGroup>
                  <Button onClick={() => filterRows("All")}>All</Button>
                  <Button onClick={() => filterRows("High")}>High</Button>
                  <Button onClick={() => filterRows("Medium")}>Medium</Button>
                </ButtonGroup>
                <Input
                  type="text"
                  placeholder="Search Alerts..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mt-3"
                />
                <Button color="info" onClick={exportAlerts} className="mt-3">
                  Download Alerts Report
                </Button>
                <UncontrolledDropdown className="mt-3">
                  <DropdownToggle caret color="secondary">
                    Sort Alerts by
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setSortOption("Location")}>
                      Location
                    </DropdownItem>
                    <DropdownItem onClick={() => setSortOption("Problem Area")}>
                      Problem Area
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Problem Area</th>
                      <th>Reported By</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th className="text-center">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAlerts
                      .filter(
                        (alert) => filter === "All" || alert.severity === filter
                      )
                      .filter(
                        (alert) =>
                          alert.problemArea
                            .toLowerCase()
                            .includes(searchTerm) ||
                          alert.description
                            .toLowerCase()
                            .includes(searchTerm) ||
                          alert.location.toLowerCase().includes(searchTerm)
                      )
                      .map((alert, index) => (
                        <tr
                          key={index}
                          onClick={() => openAlertDetails(alert)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{alert.problemArea}</td>
                          <td>{alert.reportedBy}</td>
                          <td>{alert.location}</td>
                          <td>{alert.description}</td>
                          <td
                            className="text-center"
                            style={{ color: alert.severityColor }}
                          >
                            <i className={alert.iconClass} /> {alert.severity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* Alert Details Modal */}
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Alert Details</ModalHeader>
            <ModalBody>
              {selectedAlert && (
                <>
                  <p>
                    <strong>Problem Area:</strong> {selectedAlert.problemArea}
                  </p>
                  <p>
                    <strong>Reported By:</strong> {selectedAlert.reportedBy}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedAlert.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedAlert.description}
                  </p>
                  <p>
                    <strong>Severity:</strong>{" "}
                    <span style={{ color: selectedAlert.severityColor }}>
                      {selectedAlert.severity}
                    </span>
                  </p>
                </>
              )}
            </ModalBody>
          </Modal>
        </Row>
        <Row className="justify-content-center">
          <Col lg="12" md="12">
            <Card
              className="card-chart"
              style={{ height: "400px", borderRadius: "8px" }}
            >
              <CardHeader>
                <CardTitle tag="h4" className="text-light">
                  Emissions vs. Production Output
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: "350px" }}>
                  <Line
                    data={emissionsProductionData}
                    options={correlationOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

<Row>
  <Col lg="12">
    <Card className="shadow-sm" style={{ height: "450px", borderRadius: "8px" }}>
      <CardHeader>
        <CardTitle tag="h4" className="text-light">Equipment and Alerts Map</CardTitle>
      </CardHeader>
      <CardBody style={{ padding: "0" }}>
        <MapContainer center={[29.7604, -95.3698]} zoom={10} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {equipmentData.map((equipment) => (
            <Marker
              key={equipment.id}
              position={equipment.location}
              icon={icons[equipment.alertLevel]}
            >
              <Popup>
                <strong>{equipment.name}</strong><br />
                Alert Level: <span style={{ color: equipment.alertLevel === "High" ? "red" : equipment.alertLevel === "Medium" ? "orange" : "green" }}>{equipment.alertLevel}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardBody>
    </Card>
  </Col>
</Row>

        {/* Real-Time Emissions Monitoring Section */}
        <Row className="justify-content-center">
          <Col lg="4" md="6" sm="12">
            <Card
              className="shadow-sm"
              style={{ height: "150px", borderRadius: "8px" }}
            >
              <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                <h5 className="font-weight-bold text-light">
                  Average Repair Time
                </h5>
                <h2 style={{ color: "#1f8ef1" }}>3.5 hrs</h2>
                <p className="text-muted small m-0">Based on last 30 days</p>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="6" sm="12">
            <Card
              className="shadow-sm"
              style={{ height: "150px", borderRadius: "8px" }}
            >
              <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                <h5 className="font-weight-bold text-light">Open Alerts</h5>
                <h2 style={{ color: "#f5365c" }}>12</h2>
                <p className="text-muted small m-0">Critical & high severity</p>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="6" sm="12">
            <Card
              className="shadow-sm"
              style={{ height: "150px", borderRadius: "8px" }}
            >
              <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                <h5 className="font-weight-bold text-light">
                  Emission Reduction
                </h5>
                <h2 style={{ color: "#2dce89" }}>15%</h2>
                <p className="text-muted small m-0">From previous month</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" md="10">
            <Card
              className="shadow-sm"
              style={{ height: "300px", width: "400px", borderRadius: "8px" }}
            >
              <CardHeader
                style={{
                  backgroundColor: "#1f1f2e",
                  color: emissionsLevel > 80 ? "#dc3545" : "#28a745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  borderBottom: "1px solid #333",
                }}
              >
                <i
                  className={
                    emissionsLevel > 80
                      ? "tim-icons icon-alert-circle-exc"
                      : "tim-icons icon-check-2"
                  }
                  style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
                />
                <CardTitle tag="h4" className="m-0">
                  Emissions Monitoring
                </CardTitle>
              </CardHeader>
              <CardBody className="text-light d-flex flex-column align-items-center">
                <div style={{ width: "80px", height: "80px" }}>
                  <CircularProgressbar
                    value={emissionsLevel}
                    text={`${emissionsLevel}%`}
                    styles={buildStyles({
                      textSize: "14px",
                      pathColor:
                        emissionsLevel > 80
                          ? "rgba(255, 69, 0, 0.8)"
                          : "rgba(40, 167, 69, 0.8)",
                      textColor: "#ffffff",
                      trailColor: "rgba(255,255,255,0.2)",
                    })}
                  />
                </div>
                <p
                  className="mt-3 mb-1 font-weight-bold text-center"
                  style={{ fontSize: "0.9rem" }}
                >
                  Emissions Level
                </p>
                <p className="text-muted small text-center m-0">
                  Threshold: 100%
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card
              className="shadow-sm"
              style={{ height: "400px", borderRadius: "8px" }}
            >
              <CardHeader>
                <CardTitle tag="h4" className="text-light">
                  Anomaly Detection Trends
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: "300px" }}>
                  <Line data={anomalyData} options={anomalyOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
   
  </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
