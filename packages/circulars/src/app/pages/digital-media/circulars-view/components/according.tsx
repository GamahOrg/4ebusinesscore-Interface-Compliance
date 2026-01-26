import { Accordion } from "react-bootstrap";
import { useIntl } from "react-intl";

const AccordingItem = ({ item }: any) => {
  const intl = useIntl();

  return (
    <Accordion.Item eventKey={item.id} className={`standards-accordion-button`}>
      <Accordion.Header
        className={`border-${
          intl.locale === "en" ? "start" : "end"
        } d-flex border-primary border-4 border-bottom-0 bg-transparent`}
      >
        <span className="text-primary h3 fw-bolder d-flex align-items-center">
          <i
            className={`fa-solid fa-angle-${
              intl.locale === "en" ? "right" : "left"
            } fs-2x mx-2`}
          ></i>
          {item.title}
        </span>
      </Accordion.Header>
      <Accordion.Body>{item.content}</Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordingItem;
