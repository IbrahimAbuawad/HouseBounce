import React, { useEffect, useContext } from "react";
import { Auth } from "../../context/AuthContext";
import { Prop } from "../../context/PropContext";
import RenderCards from "../rendercards/RenderCards";
import CardGroup from "react-bootstrap/CardGroup";
import "./home.css";

function Home({ logged }) {
  const AuthObject = useContext(Auth);
  const PropObject = useContext(Prop);

  function getData() {
    PropObject.getPropForUsers();
    PropObject.getPropForAdmins();
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthObject]);

  if (logged) {
    if (PropObject.renderData) {
      return (
        <div className="cardGroup">
          <RenderCards renderData={PropObject.renderData} />
        </div>
      );
    } else {
      return (
        <div class="empty">
          <h1>You dont have any property</h1>
        </div>
      );
    }
  } else {
    return (
      <div class="empty">
        <h1>this page is empty Please Sign in</h1>
      </div>
    );
  }
}

export default Home;
