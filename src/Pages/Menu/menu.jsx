import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header/header";

function Menu() {

  const navigate = useNavigate();

  //usar o try
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log('ok')
    } else {
      navigate("/menu")
    }
  })

  return (
    <>
      <HeaderComponent />
      <h1 className="text-center mt-[4%] text-2xl font-semibold">ESCOLHA UMA OPÇÃO:</h1>
      <div className="flex justify-between w-full px-24 py-12">
        <div className="bg-[#5492E3] px-28 py-36 rounded-2xl drop-shadow-lg">
          <a href="/menu">
            <p className="text-white text-2xl">PROJETO</p>
          </a>
        </div>

        <div className="bg-[#48AAE0] px-28 py-36 rounded-2xl drop-shadow-lg">
          <a href="/menu" >
            <p className="text-white text-2xl">COTAÇÃO</p>
          </a>
        </div>

        <div className="bg-[#42B8DE] px-28 py-36 rounded-2xl drop-shadow-lg">
          <a href="/painel/lpr" >
            <p className="text-center text-white text-2xl">PROVA <br />PRÁTICA</p>
          </a>
        </div>

      </div>
    </>
  );
}

export default Menu;
