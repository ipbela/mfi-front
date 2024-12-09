import React, { useState, useEffect } from "react";
import { Logo, Wrapper } from "./style";
import { Sidebar } from "./style";
import SIV from "../../Assets/Imagens/logo1_SIV.png"
import { useLocation } from "react-router-dom";

function NavBarComponent() {

  //Função para "Concatenar as páginas de acordo com as funcionalidades"
  const location = useLocation();
  const [rootPath, setRootPath] = useState('');

  useEffect(() => {
    const firstSegment = location.pathname.split('/')[1];
    if (['Projeto', 'Cotacao', 'ProvaPratica'].includes(firstSegment)) {
      setRootPath(`/${firstSegment}`);
    } else {
      setRootPath('');
    }
  }, [location]);

  const componentsPath = `${rootPath}/Components`;
  const projectsPath = `${rootPath}/Projects`;
  const calendarPath = `${rootPath}/Calendar`;
  const contactsPath = `${rootPath}/Contacts`;

  return (
    <>
    <Wrapper>
      <Sidebar>
        <Logo src={SIV} alt=""/>
          <ul>
            <li>
              <a href='/Menu'><i className='fas fa-home'></i>Home</a>
            </li>
            <li>
              <a href={componentsPath}><i className='fas fa-table'></i>Components</a>
            </li>
            <li>
              <a href={projectsPath}><i className='fas fa-light fa-list'></i>Projects</a>
            </li>
            <li>
              <a href={calendarPath}><i className='fas fa-regular fa-calendar'></i>Calendar</a>
            </li>
            <li>
            <a href={contactsPath}><i class="fas fa-address-book" ></i>Contacts</a>
            </li>
            <li>
              <a href="/Home"><i class="fas fa-light fa-arrow-right"></i>Exit</a>
            </li>
          </ul>
      </Sidebar>
    </Wrapper>
      
    </>
  );
}

export default NavBarComponent;
