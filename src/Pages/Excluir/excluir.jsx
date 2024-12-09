import HeaderComponent from "../../Components/Header/header";
import React, { useState } from "react";
import "./style.css";
import Lixeira from "../../Assets/Imagens/lixeira.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Excluir() {
	const location = useLocation();
	const lpr = location.state?.lpr || {};
	const [molde, setMolde] = useState("");
	const navigate = useNavigate();

	const errorRegister = () =>
		toast.error(
			"Erro ao excluir LPR. Verifique se o nome foi digitado corretamente."
		);
	const errorRegisterServer = () =>
		toast.error("Erro ao excluir LPR. Tente novamente mais tarde.");

	const deleteLpr = async () => {
		try {
			if (lpr.molde === molde) {
				await axios.delete(`http://127.0.0.1:8001/api/v1/lprs/${lpr.id_lpr}`);
				navigate("/painel/lpr");
			} else {
				errorRegister();
			}
		} catch (error) {
			errorRegisterServer();
		}
	};

	const handleCancel = () => {
		navigate("/painel/lpr");
	};

	return (
		<>
			<HeaderComponent />
			<div>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>

			<div className="Tela">
				<div className="Maior">
					<h1 className="Frase">
						<center>Tem certeza que deseja excluir</center>
						<center>essa LPR?</center>
					</h1>
					<img src={Lixeira} alt="Lixeira" className="Lixeira" />
					<h1 className="Frase2">
						<center>Para excluir essa LPR, digite o</center>
						<center>código do molde:</center>
					</h1>
					<h1 className="Frase3">
						<center>{lpr.molde}</center>
					</h1>
					<div className="user-box">
						<input
							type="text"
							id="molde"
							name="molde"
							value={molde}
							onChange={(e) => setMolde(e.target.value)}
						/>
					</div>
					<div className="buttons">
						<button className="Submitbutton" onClick={handleCancel}>
							CANCELAR
						</button>
						<button className="Submitbutton1" onClick={deleteLpr}>
							CONFIRMAR
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Excluir;
