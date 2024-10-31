import React, { useState } from "react";
import classNames from "classnames";
import { saveAs } from "file-saver";
import { Line } from "react-chartjs-2";
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
import {
  chartExample1,
} from "variables/charts.js";

function Dashboard(props) {
  const [bigChartData, setBigChartData] = useState("data1");
  const [filter, setFilter] = useState("All");

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
                <ButtonGroup>
                  <Button onClick={() => filterRows("All")}>All</Button>
                  <Button onClick={() => filterRows("High")}>High</Button>
                  <Button onClick={() => filterRows("Medium")}>Medium</Button>
                </ButtonGroup>
                <Input
                  type="text"
                  placeholder="Search Tasks..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mt-3"
                />
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
                          alert.problemArea.toLowerCase().includes(searchTerm) ||
                          alert.description.toLowerCase().includes(searchTerm) ||
                          alert.location.toLowerCase().includes(searchTerm)
                      )
                      .map((alert, index) => (
                        <tr key={index} onClick={() => openAlertDetails(alert)} style={{ cursor: "pointer" }}>
                          <td>{alert.problemArea}</td>
                          <td>{alert.reportedBy}</td>
                          <td>{alert.location}</td>
                          <td>{alert.description}</td>
                          <td className="text-center" style={{ color: alert.severityColor }}>
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
                  <p><strong>Problem Area:</strong> {selectedAlert.problemArea}</p>
                  <p><strong>Reported By:</strong> {selectedAlert.reportedBy}</p>
                  <p><strong>Location:</strong> {selectedAlert.location}</p>
                  <p><strong>Description:</strong> {selectedAlert.description}</p>
                  <p><strong>Severity:</strong> <span style={{ color: selectedAlert.severityColor }}>{selectedAlert.severity}</span></p>
                </>
              )}
            </ModalBody>
          </Modal>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
