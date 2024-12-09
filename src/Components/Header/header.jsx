import React from "react";
import barrinha from "../../Assets/Imagens/barrinha_bosch.svg";
import Bosch from "../../Assets/Imagens/Logo.svg";
import SIV from "../../Assets/Imagens/logo1SIV-semfundo.png";

function HeaderComponent() {
	return (
		<div className="w-full">
			<img
				src={barrinha}
				alt="Barrinha"
				className=""
			/>
			<div className="flex items-center justify-between w-full px-4">
				<img src={Bosch} alt="Bosch Logo" className="h-50 w-50" />
				<img src={SIV} alt="SIV Logo" className="h-10 w-auto" />
			</div>
		</div>
	);
}

export default HeaderComponent;

