
import { Accordion } from "react-bootstrap";
import AccordingItem from "./according";
import NestedCircularsTable from "./nested-circulars-table";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useIntl } from "react-intl";
interface NestedAccordingProps {
  circualrsData: any;
  paginationProps: any;
}

const NestedAccording : React.FC<NestedAccordingProps> = ({circualrsData , paginationProps}) => {
  const intl = useIntl();
  return (
    <Accordion className="d-flex flex-column gap-5 mx-3 nested-according" >
        {circualrsData?.map((circular: any, index: any) => (
          <AccordingItem item={{ id: circular.orgId || circular.userId,
            title: circular.orgNameAr || circular.fullName, content: <NestedCircularsTable circulars={circular?.circulars}/>}} key={index}></AccordingItem>
        ))}
        
        {paginationProps?.totalPages == 0 ?  
        <div className="text-center fw-bold my-5">{ intl.formatMessage({ id: "NoCircularFound" })}</div> :
        <SystemPagination
          totalPages={paginationProps?.totalPages}
          totalItems={paginationProps?.totalItems}
          pageIndex={paginationProps?.pageIndex}
          pageSize={paginationProps?.pageSize}
          setPageIndex={paginationProps?.setPageIndex}
          setPageSize={paginationProps?.setPageSize}
        />}
          
      </Accordion>
  )
}

export default NestedAccording