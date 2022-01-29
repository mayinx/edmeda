import { Route } from "react-router-dom";
import Header from "./Registration/Header";
import LandingPage from "../../pages/welcome/LandingPage";
import "./RegistrationLayout.css";

import Modal from "../../components/modal/Modal.js";

import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";

import Carousel from "./Registration/HeroCarousel";

export default function RegistrationLayout() {
  const REGISTER_ACTION_FORM_ID = "registerUser";
  const LOGIN_ACTION_FORM_ID = "loginUser";

  return (
    <>
      <Header className="RegistrationHeader" />
      <main className="RegistrationLayout">
        <Carousel />
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/register">
          <Modal
            className="Register"
            modalCaption="Create Edmeda-Account"
            crudAction="create"
            formId={REGISTER_ACTION_FORM_ID}
            goBackTo="/"
          >
            <Register formId={REGISTER_ACTION_FORM_ID} />
          </Modal>
        </Route>
        <Route exact path="/login">
          <Modal
            className="LoginModal"
            modalCaption="Login"
            crudActionBtnCaption="Login"
            crudActionBtnId="loginBtn"
            crudAction="update"
            formId={LOGIN_ACTION_FORM_ID}
            goBackTo="/"
          >
            <Login formId={LOGIN_ACTION_FORM_ID} />
          </Modal>
        </Route>
      </main>
    </>
  );
}
