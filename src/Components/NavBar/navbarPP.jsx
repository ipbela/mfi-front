import React, { useState, useEffect } from "react";
import { Logo, Wrapper } from "./style";
import { Sidebar } from "./style";
import SIV from "../../Assets/Imagens/logo1_SIV.png";
import { useLocation } from "react-router-dom";

function NavBarComponentPP() {
  //Função para "Concatenar as páginas de acordo com as funcionalidades"
  const location = useLocation();
  const [rootPath, setRootPath] = useState("");

  useEffect(() => {
    const firstSegment = location.pathname.split("/")[1];
    if (["Projeto", "Cotacao", "ProvaPratica"].includes(firstSegment)) {
      setRootPath(`/${firstSegment}`);
    } else {
      setRootPath("");
    }
  }, [location]);

  const LprPath = `${rootPath}/Lpr`;

  return (
    <>
      <Wrapper>
        <Sidebar>
          <Logo src={SIV} alt="" />
          <ul>
            <li>
              <a href="/Menu">
                <i className="fas fa-home"></i>Home
              </a>
            </li>
            <li>
              <a href={LprPath}>
                <i className="fas fa-table"></i>LPR
              </a>
            </li>
            <li>
              <a href="/Home">
                <i class="fas fa-light fa-arrow-right"></i>Exit
              </a>
            </li>
          </ul>
        </Sidebar>
      </Wrapper>
    </>
  );
}

export default NavBarComponentPP;
