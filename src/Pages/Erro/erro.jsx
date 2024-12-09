import React from "react";
import "./erro.css";
import HeaderComponent from "../../Components/Header/header";
import Seta from "../../Assets/Imagens/seta.svg";

function Erro() {
	return (
		<>
			<HeaderComponent />
			<a href="/menu">
				<img src={Seta} alt="" style={{ marginLeft: "3.5%", width: "2.5%" }} />
			</a>
			<div className="MainContentErro">
				<div className="erro">
					<h1>ERRO 404!</h1>
				</div>
				<div className="mensagem">
					<h2>
						Parece que você encontrou um beco sem saída.<br></br>A página que
						você está procurando não está disponível.
					</h2>
				</div>
			</div>
		</>
	);
}

export default Erro;
