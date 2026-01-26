import { useIntl } from "react-intl";
import { Accordion } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import CurrentCircularsTable from "./current-circulars-table";
import ArchivesTable from "./archives-table";
const CircularsHome = () => {
  const intl = useIntl();

  const accordionData = [
    {
      id: "1",
      title: intl.formatMessage({ id: "TheFinanceManagement" }),
      content: <CurrentCircularsTable />,
    },
    {
      id: "2",
      title: intl.formatMessage({ id: "HumanResourcesManagement" }),
      content: <CurrentCircularsTable />,
    },
    {
      id: "3",
      title: intl.formatMessage({ id: "InfrastructureManagement" }),
      content: <CurrentCircularsTable />,
    },
    {
      id: "4",
      title: intl.formatMessage({ id: "ResearchDevelopmentDepartment" }),
      content: <CurrentCircularsTable />,
    },
  ];

  const archivesData = [
    {
      id: "1",
      title: intl.formatMessage({ id: "TheFinanceManagement" }),
      content: <ArchivesTable />,
    },
    {
      id: "2",
      title: intl.formatMessage({ id: "HumanResourcesManagement" }),
      content: <ArchivesTable />,
    },
    {
      id: "3",
      title: intl.formatMessage({ id: "InfrastructureManagement" }),
      content: <ArchivesTable />,
    },
    {
      id: "4",
      title: intl.formatMessage({ id: "ResearchDevelopmentDepartment" }),
      content: <ArchivesTable />,
    },
  ];
  const EN_LANG = "en";
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang || "").selectedLang;
  } catch (err) {
    // console.log("Can't get selectedLang from localStorage");
  }
  return (
    <>
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-body pt-0 mt-8">
          <h3 className="fs-2"> {intl.formatMessage({ id: "Circulars" })}</h3>
          <p className="mt-2 fs-5 text-muted">
            {intl.formatMessage({ id: "StandardsTable" })}
          </p>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Nav variant="underline" className="standard">
                <Nav.Item className="mb-10">
                  <Nav.Link eventKey="first" className="fw-bolder fs-5">
                    {intl.formatMessage({ id: "CurrentStandards" })}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="fw-bolder fs-5">
                    {intl.formatMessage({ id: "Archives" })}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Accordion defaultActiveKey="1">
                    {accordionData.map((item, index) => (
                      <Accordion.Item
                        eventKey={item.id}
                        className={`standards-accordion-button ${
                          index != 0 ? "mt-5" : "mb-3"
                        }`}
                        key={index}
                      >
                        <Accordion.Header
                          className={`border-${
                            selectedLang == EN_LANG ? "start" : "end"
                          } d-flex border-primary border-4 border-bottom-0 bg-transparent`}
                        >
                          <span className="text-primary h3 fw-bolder d-flex align-items-center">
                            <i
                              className={`fa-solid fa-angle-${
                                selectedLang == EN_LANG ? "right" : "left"
                              } fs-2x mx-2`}
                            ></i>
                            {intl.formatMessage({ id: item.title })}
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>{item.content}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {" "}
                  <Accordion defaultActiveKey="1">
                    {archivesData.map((item, index) => (
                      <Accordion.Item
                        eventKey={item.id}
                        className={`standards-accordion-button ${
                          index != 0 ? "mt-5" : "mb-3"
                        }`}
                        key={index}
                      >
                        <Accordion.Header
                          className={`border-${
                            selectedLang == EN_LANG ? "start" : "end"
                          } d-flex border-primary border-4 border-bottom-0 bg-transparent`}
                        >
                          <span className="text-primary h3 fw-bolder d-flex align-items-center">
                            <i
                              className={`fa-solid fa-angle-${
                                selectedLang == EN_LANG ? "right" : "left"
                              } fs-2x mx-2`}
                            ></i>
                            {intl.formatMessage({ id: item.title })}
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>{item.content}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};
export default CircularsHome;
