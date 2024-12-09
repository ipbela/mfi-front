import React from "react";
import Bosch from "../../Assets/Imagens/logo_bosch.png"
import { HeaderPages } from "./style";
import { useLocation } from "react-router-dom";


function HeaderPagesComponent() {

  const location = useLocation();
  const locationFormatted = location.pathname.substring(1).replace(/\//g, ' - ');
  return (
    <>
    <HeaderPages>
      <p>{locationFormatted}</p>
      <img src={Bosch}/>
    </HeaderPages>
    </>
  );
}

export default HeaderPagesComponent;