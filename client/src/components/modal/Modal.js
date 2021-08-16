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

import React from "react";
import "./Modal.css";
import { useHistory } from "react-router";
import { createPortal } from "react-dom";
import { FaRegTimesCircle } from "react-icons/fa";

export default function Modal(props) {
  const history = useHistory();

  return createPortal(
    <div className="Modal">
      <div className="Modal__inner">
        <div className="ModalPage__header d-flex">
          <h3 className="ModalPage__headerCaption">
            {props.modalCaption || "Modal Dialog"}
          </h3>
          <div className="closeDlgAction" onClick={() => history.goBack()}>
            <FaRegTimesCircle />
          </div>
        </div>
        <div className="ModalPage__body">{props.children}</div>
        <div className="ModalPage__footer">
          <div className="ModalActions">
            <button
              className="btn rounded light-red"
              onClick={() => history.goBack()}
            >
              Close
            </button>
            {props.crudAction === "create" && (
              <button
                form={props.formId || "newResource"}
                className="btn rounded green newResourceBtn"
                type="submit"
              >
                Create
              </button>
            )}
            {props.crudAction === "update" && (
              <button
                form={props.formId || "updateResource"}
                className="btn rounded green updateResourceBtn"
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal_root")
  );
}
