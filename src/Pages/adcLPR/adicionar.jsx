import React, { useState } from "react";
import HeaderComponent from "../../Components/Header/header";
import Seta from "../../Assets/Imagens/seta.svg";
import lapis from "../../Assets/Imagens/AdcProblema.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Adicionar() {
	const [data, setData] = useState("");
	const [produto, setProduto] = useState("");
	const [norma, setNorma] = useState("");
	const [molde, setMolde] = useState("");
	const [lprId, setLprId] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const navigate = useNavigate();

	const valuesNull = () => toast.error("Preencha todos os campos, por favor!");
	const errorInput = (message) => toast.error(message);
	const errorRegister = () =>
		toast.error("Erro ao registrar LPR. Tente novamente mais tarde.");
	const notifyConfirm = () =>
		toast.success("Providência cadastrada com sucesso!");

	const inputsValue = async () => {
		if (!data || !produto || !norma || !molde) {
			valuesNull();
			return;
		}
		registerLpr();
	};

	const registerLpr = async () => {
		let corSelecionada = selectedOption === "green" ? 1 : 0;
		try {
			const response = await axios.post("http://127.0.0.1:8001/api/v1/lprs/", {
				data: data,
				produto: produto,
				norma: norma,
				molde: molde,
				situacao: corSelecionada,
			});
			const id_lpr = response.data.id_lpr;
			setLprId(id_lpr);
			setData("");
			setProduto("");
			setNorma("");
			setMolde("");
			setModalVisible(true);
		} catch (error) {
			if(error.response && error.response.data.detail){
				errorInput(error.response.data.detail);
			}else{
				errorRegister();
			}
		}
	};

	const [selectedOption, setSelectedOption] = useState("green");

	const handleOptionClick = (option) => {
		setSelectedOption(option);
	};

	const Modal = ({ show, onClose, lprId }) => {
		const [responsavel, setResponsavel] = useState(localStorage.getItem("nome"));
		const [participantes, setParticipantes] = useState("");
		const [numero, setNumero] = useState("");
		const [prioridade, setPrioridade] = useState("");
		const [prazo, setPrazo] = useState("");
		const [predecessora, setPredecessora] = useState("");
		const [dataFim, setDataFim] = useState("");
		const [problema, setProblema] = useState("");
		const [providencias, setProvidencias] = useState("");
		const [consenso, setConsenso] = useState("");
		const [pdca, setPdca] = useState("");
		
		const getDate = () => {
			const atual = new Date();
			const dia = atual.getDay();
			const mes = atual.getMonth();
			const ano = atual.getFullYear();
			const hora = atual.getHours();
			const minuto = atual.getMinutes();

			return `${dia}/${mes}/${ano} - ${hora}:${minuto}`
		}

		const valuesNull = () => toast.error("Preencha todos os campos obrigatórios, por favor!");
		const errorRegister = () =>
			toast.error("Erro ao registrar providência. Tente novamente mais tarde.");

    const inputsValueProv = async () => {
      if (!responsavel || !numero || !prioridade || !problema || !pdca) {
        valuesNull();
        return;
      }
      registerProv();
    };

		const registerProv = async () => {
			try {
				await axios.post("http://127.0.0.1:8001/api/v1/provs/", {
					responsavel: responsavel,
					participantes: participantes,
					numero: numero,
					prioridade: prioridade,
					prazo: prazo,
					predecessora: predecessora,
					dataFim: dataFim,
					problema: problema,
					providencias: providencias,
					consenso: consenso,
					pdca: pdca,
					id_lpr: lprId,
					data_edicao: getDate()
				});
				setParticipantes("");
				setNumero("");
				setPrioridade("");
				setPrazo("");
				setPredecessora("");
				setDataFim("");
				setProblema("");
				setProvidencias("");
				setConsenso("");
				setPdca("");
				console.log(getDate());
				notifyConfirm();
			} catch (error) {
				errorRegister();
			}
		};

		if (!show) return null;

		return (
			<div className="modal-overlay">
				<div className="modal-content">
					<h2>Adicionar Providência</h2>
					<div className="modal-box">
						<div className="modal-input">
							<p>RESPONSÁVEIS: <span className="vermelho">*</span></p>
							<input
								type="text"
								id="text"
								value={responsavel}
								readOnly
								onChange={(e) => setResponsavel(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>PARTICIPANTES:</p>
							<input
								type="text"
								id="text"
								value={participantes}
								placeholder="Digite o participantes"
								onChange={(e) => setParticipantes(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>N°: <span className="vermelho">*</span></p>
							<input
								type="number"
								id=" text"
								value={numero}
								placeholder="Digite o número"
								onChange={(e) => setNumero(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>PRIORIDADE: <span className="vermelho">*</span></p>
							<input
								type="text"
								id="text"
								value={prioridade}
								placeholder="Digite a prioridade"
								onChange={(e) => setPrioridade(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>PRAZO:</p>
							<input
								type="date"
								id="date"
								value={prazo}
								onChange={(e) => setPrazo(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>PREDECESSORA: </p>
							<input
								type="text"
								id="text"
								value={predecessora}
								placeholder="Digite a predecessora"
								onChange={(e) => setPredecessora(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>DATA FINAL:</p>
							<input
								type="date"
								id="date"
								value={dataFim}
								onChange={(e) => setDataFim(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>PROBLEMA: <span className="vermelho">*</span></p>
							<input
								type="text"
								id="text"
								value={problema}
								placeholder="Digite o problema"
								onChange={(e) => setProblema(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>PROVIDÊNCIA: </p>
							<input
								type="text"
								id="text"
								value={providencias}
								placeholder="Digite a providência"
								onChange={(e) => setProvidencias(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>CONSENSO:</p>
							<input
								type="text"
								id="text"
								value={consenso}
								placeholder="Digite o consenso"
								onChange={(e) => setConsenso(e.target.value)}
							/>
						</div>

						<div className="modal-input">
							<p>Ciclo PDCA: <span className="vermelho">*</span></p>
							<select
								id="select"
								name="pdca"
								value={pdca}
								onChange={(e) => setPdca(e.target.value)}
							>
								<option value="">Selecione uma atribuição...</option>
								<option value="Planejar">Planejar</option>
								<option value="Fazer">Fazer</option>
								<option value="Checar">Checar</option>
								<option value="Agir">Agir</option>
							</select>
						</div>

						<div className="modal-input" style={{ visibility: "hidden" }}>
							<p>ID LPR:</p>
							<input
								type="text"
								id="text"
								value={lprId}
								style={{ width: "50px" }}
							/>
						</div>
					</div>
					<div className="modal-buttons">
						<button className="btn-confirm" onClick={inputsValueProv}>
							Adicionar Providência
						</button>
						<br />
						<button className="btn-cancel" onClick={onClose}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		);
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
							placeholder="Digite o produto"
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
							placeholder="Digite a norma"
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
							placeholder="Digite o molde"
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
			<button className="btn-lpr-add" onClick={() => inputsValue()}>
				<img src={lapis} alt="" className="lapis-img" />
				NOVA PROVIDÊNCIA
			</button>

			<Modal
				show={modalVisible}
				onClose={() => setModalVisible(false)}
				lprId={lprId}
			/>
		</>
	);
}

export default Adicionar;
