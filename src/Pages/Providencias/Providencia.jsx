import React from "react";
import "./Providencia.css";
import HeaderComponent from "../../Components/Header/header";
import Menu from "../../Components/Menu/Menu";
import Table from "../../Components/Table/Table";
import { useLocation } from "react-router-dom";

const Providencias = () => {
  const location = useLocation();
  const lpr = location.state?.lpr || {};

  return (
    <>
      <HeaderComponent />
      <Menu />
      <div className="table-container">
        <Table lpr={lpr} />
      </div>
    </>
  );
};

export default Providencias;
