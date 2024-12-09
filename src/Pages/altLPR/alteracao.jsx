import React, { useState, useEffect } from "react";
import Seta from "../../Assets/Imagens/seta.svg";
import HeaderComponent from "../../Components/Header/header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function Alteracao() {
	const location = useLocation();
	const lpr = location.state?.lpr || {};

	const [data, setData] = useState("");
	const [produto, setProduto] = useState("");
	const [norma, setNorma] = useState("");
	const [molde, setMolde] = useState("");
	const [situacao, setSituacao] = useState(1);

	const navigate = useNavigate();

	useEffect(() => {
		if (lpr) {
			setData(lpr.data || "");
			setProduto(lpr.produto || "");
			setNorma(lpr.norma || "");
			setMolde(lpr.molde || "");
			setSituacao(lpr.situacao !== undefined ? lpr.situacao : 1);
		}
	}, [lpr]);

	const valuesNull = () => toast("Preencha todos os campos, por favor!");
	const errorRegister = () =>
		toast("Erro ao registrar LPR. Tente novamente mais tarde.");

	const inputsValue = () => {
		if (!data || !produto || !norma || !molde) {
			valuesNull();
			return;
		}

		updateLpr();
	};

	const updateLpr = async () => {
		try {
			await axios.put(`http://127.0.0.1:8001/api/v1/lprs/${lpr.id_lpr}`, {
				data,
				produto,
				norma,
				molde,
				situacao,
			});
			navigate("/painel/lpr");
		} catch (error) {
			errorRegister();
		}
	};

	const [selectedOption, setSelectedOption] = useState("green");

	const handleOptionClick = (option) => {
		setSelectedOption(option);
	};

	return (
		<>
			<HeaderComponent />
			<div className="toast-container">
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
			<div className="MaincontentAddLpr">
				<img
					src={Seta}
					alt=""
					className="seta"
					onClick={() => navigate("/painel/lpr")}
					style={{ cursor: "pointer" }}
				/>
				<div className="FormLpr">
					<div className="form-group">
						<p>DATA:</p>
						<input
							className="Date-lpr"
							type="date"
							id="date"
							value={data}
							onChange={(e) => setData(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<p>PRODUTO:</p>
						<input
							className="Text-lpr"
							type="text"
							id="text"
							value={produto}
							onChange={(e) => setProduto(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<p>NORMA:</p>
						<input
							className="Text-lpr"
							type="text"
							id="text"
							value={norma}
							onChange={(e) => setNorma(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<p>MOLDE:</p>
						<input
							className="Text-lpr"
							type="text"
							id="text"
							value={molde}
							onChange={(e) => setMolde(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<p>SITUAÇÃO:</p>
						<div className="SelectorContainerLpr">
							<div
								className="Option"
								style={{
									backgroundColor:
										selectedOption === "green" ? "green" : "#E5E5E5",
								}}
								onClick={() => handleOptionClick("green")}
							/>
							<div
								className="Option"
								style={{
									backgroundColor: selectedOption === "red" ? "red" : "#E5E5E5",
								}}
								onClick={() => handleOptionClick("red")}
							/>
						</div>
					</div>
				</div>
			</div>
			<button className="btn-lpr-up" onClick={() => inputsValue()}>
				SALVAR ALTERAÇÕES
			</button>
		</>
	);
}

export default Alteracao;
