/* MODAL CPMPONENT
- Can be utilized to render complete pages or syimpke on the fly dialogs, whatever is passed as implicit children arg

  <Modal>
    <WhatEver/>
  </Modal>

- If the Modal is used in combination with a Route (via the 'render'-attr / prop) and a path is provided, the rendered Modal receives its own visible url - e.g.:

      <Route
        path="/communities/new"
        render={() => {
          return (
            <Modal>
              <NewCommunityPage />
            </Modal>
          );
        }}
      />
*/

import React, { useContext, useEffect } from "react";
import "./Modal.css";
import { useHistory } from "react-router";
import { createPortal } from "react-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import ModalContext from "../../contexts/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Modal(props) {
  const { showCrudActions = true } = props;

  const history = useHistory();
  // const goBackTo = props.goBackTo || "/";
  const goBack = (e) => {
    e.stopPropagation();
    props.goBackTo ? history.push(props.goBackTo) : history.goBack();
    // history.goBack();
    // history.push("/");
  };

  const { setModalOpen, modalCaption, setModalCaption } = useContext(
    ModalContext
  );

  useEffect(() => {
    setModalOpen(true);

    return () => {
      setModalOpen(false);
      setModalCaption("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className={`Modal ${props.className}`}>
      <div
        className="Modal__inner"
        // style={{
        //   width: props.modalWidth || "90%",
        //   minWidth: props.modalMinWidth || "auto",
        //   height: props.modalHeight || "90%",
        //   minHeight: props.modalMinHeight || "auto",
        // }}
      >
        <div className="ModalPage__header d-flex">
          <h3 className="ModalPage__headerCaption">
            {props.modalCaption || modalCaption}
          </h3>
          <div
            className="closeDlgAction"
            // onClick={() => history.push(goBackTo)}
            onClick={goBack}
          >
            <FaRegTimesCircle />
          </div>
        </div>
        <div className="ModalPage__body">{props.children}</div>
        <div className="ModalPage__footer">
          {showCrudActions && (
            <div className="ModalActions">
              {props.crudAction === "create" && (
                <>
                  <button className="btn rounded light-red" onClick={goBack}>
                    Close
                  </button>
                  <button
                    form={props.formId || "newResource"}
                    id={`${props.crudActionBtnId ?? "submitBtn"}`}
                    className="btn rounded green newResourceBtn"
                    type="submit"
                  >
                    {`${props.crudActionBtnCaption ?? "Create"}`}
                  </button>
                </>
              )}
              {props.crudAction === "update" && (
                <>
                  <button className="btn rounded light-red" onClick={goBack}>
                    Close
                  </button>
                  <button
                    form={props.formId || "updateResource"}
                    id={`${props.crudActionBtnId ?? "submitBtn"}`}
                    className="btn rounded green updateResourceBtn"
                    type="submit"
                  >
                    {`${props.crudActionBtnCaption ?? "Update"}`}
                  </button>
                </>
              )}
              {props.crudAction === "custom" && (
                <>
                  <button className="btn rounded light-red" onClick={goBack}>
                    Close
                  </button>
                  {props.modalFooterActions}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={"modalNotificationCnt"}
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>,
    document.getElementById("modal_root")
  );
}
