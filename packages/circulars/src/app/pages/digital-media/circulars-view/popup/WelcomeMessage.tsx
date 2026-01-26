import React, { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { fetchLastMessage } from "../../../../redux/message-slice";
import { useSelector } from "react-redux";

type DeletePopupProps = {
  cancelFun: () => void;
};

export const WelcomeMessagePopupc: FC<DeletePopupProps> = ({ cancelFun }) => {
  const intl = useIntl();
  const lang = intl.locale;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchLastMessage({}));
  }, []);

  const { lastMessage } = useSelector((state: any) => state.message);

  return (
    <Modal centered show={true} size="lg">
      <Modal.Header
        onClick={() => {
          cancelFun();
        }}
        closeButton
        style={{
          alignItems: intl.locale === "ar" ? "flex-start" : "center",
          flexDirection: intl.locale === "en" ? "column-reverse" : "row",
        }}
      >
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center mb-5">
          <div className="text-center">
            <h5>
              {(lang === "ar"
                ? lastMessage?.descriptionAr
                : lastMessage?.descriptionEn
              )
                ?.split("\n")
                .map((line: string, idx: number) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
            </h5>
          </div>
        </Row>
      </Modal.Body>

      <Modal.Footer className="justify-content-center py-2">
        <div className="row">
          <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
            <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center w-100">
                <button
                  type="reset"
                  className="btn btn-success"
                  onClick={cancelFun}
                >
                  {intl.formatMessage({ id: "Agree" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
