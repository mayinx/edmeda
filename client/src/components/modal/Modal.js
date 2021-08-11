/* MODAL CPMPONENT
- Can be utilized to render complete pages or syimpke on the fly dialogs, whatever is passed as implicit children arg

  <Modal>
    <WhatEver/>
  </Modal>

- If the Modal is used in combination with a Route (via the 'render'-attr / prop) and a path is provided, the rendered Modal receives its own visible url - e.g.:

      <Route
        path="/newCommunity"
        render={() => {
          return (
            <Modal>
              <NewCommunityModalPage />
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

export default function Modal({ modalCaption, children }) {
  const history = useHistory();

  return createPortal(
    <div className="Modal">
      <div className="Modal__inner">
        <div className="ModalPage__header d-flex">
          <h3 className="ModalPage__headerCaption">
            {modalCaption || "Modal Dialog"}
          </h3>
          <div className="closeDlgAction" onClick={() => history.goBack()}>
            <FaRegTimesCircle />
          </div>
        </div>
        <div className="ModalPage__body">{children}</div>
        <div className="ModalPage__footer">yo</div>
      </div>
    </div>,
    document.getElementById("modal_root")
  );
}
