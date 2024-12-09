import React, { useState } from "react";
import axios from "axios";
import SIV from "../../Assets/Imagens/logo1SIV-semfundo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "react-icons-kit";
import { basic_exclamation } from "react-icons-kit/linea/basic_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";

function Cadastro() {
	const [login, setLogin] = useState("");
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	const [funcao, setFuncao] = useState("");

	const navigate = useNavigate();

	//validation
	const [lowerValidated, setLowerValited] = useState(false);
	const [upperValited, setUpperValited] = useState(false);
	const [numberValited, setNumberValited] = useState(false);
	const [specialValited, setSpecialValited] = useState(false);
	const [lengthValited, setLengthValited] = useState(false);

	const handleChange = (value) => {
		// regex
		const lower = new RegExp("(?=.*[a-z])");
		const upper = new RegExp("(?=.*[A-Z])");
		const number = new RegExp("(?=.*[0-9])");
		const special = new RegExp("(?=.*[!@#$%^&*-_])");
		const length = new RegExp("(?=.{6,})");

		//lowercase validation
		if (lower.test(value)) {
			setLowerValited(true);
		} else {
			setLowerValited(false);
		}

		//uppercase validation
		if (upper.test(value)) {
			setUpperValited(true);
		} else {
			setUpperValited(false);
		}

		//number validation
		if (number.test(value)) {
			setNumberValited(true);
		} else {
			setNumberValited(false);
		}

		//special validation
		if (special.test(value)) {
			setSpecialValited(true);
		} else {
			setSpecialValited(false);
		}

		//length validation
		if (length.test(value)) {
			setLengthValited(true);
		} else {
			setLengthValited(false);
		}
	};

	const notifyError = () =>
		toast.error("Este login já está em uso. Por favor escolha outro!");
	const notifyServidor = () =>
		toast.error("Erro ao verificar o login. Por favor tente novamente!");
	const notifyLogin = () => toast.error("Por favor, preencha o login");
	const notifySenha = () => toast.error("Por favor, preencha a senha");
	const notifyNome = () => toast.error("Por favor, preencha o nome");
	const notifyFuncao = () => toast.error("Por favor, escolha uma função");
	const notifySenhaConfirm = () =>
		toast.error(
			"Por favor, certifique-se de atender todos os critérios de segurança da senha."
		);
	const notifyNomeNumerico = () =>
		toast.error("O nome deve conter apenas letras");
	const notifyConfirm = () =>
		toast.success("Funcionário cadastrado com sucesso!");

	const inputsValue = async () => {
		if (login === "") {
			notifyLogin();
		} else if (senha === "") {
			notifySenha();
		} else if (
			!/(?=.*[a-z])/.test(senha) ||
			!/(?=.*[A-Z])/.test(senha) ||
			!/(?=.*\d)/.test(senha) ||
			!/(?=.*[^a-zA-Z0-9\s])/.test(senha) ||
			senha.length < 6
		) {
			notifySenhaConfirm();
		} else if (nome === "") {
			notifyNome();
		} else if (!/^[a-zA-Z\s]*$/.test(nome)) {
			notifyNomeNumerico();
		} else if (funcao === "") {
			notifyFuncao();
		} else {
			fetchUsers();
		}
	};

	const fetchUsers = async () => {
		try {
			await axios.post("http://127.0.0.1:8001/api/v1/users/", {
				login: login,
				nome: nome,
				senha: senha,
				id_atribuicao: funcao,
			});
			notifyConfirm();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				notifyError();
			} else {
				notifyServidor();
			}
		}
	};

	return (
		<>
			<div className="flex items-center justify-center h-screen">
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
				<div className="border-slate-300 shadow-lg border-2 rounded-lg w-[60%] h-[90%]">
					<img src={SIV} alt="" className="w-24 h-24 ml-[44%] mt-[5%]" />
					<div className="p-8 flex gap-[20%]">
						<div className="">
							<p>LOGIN:</p>
							<input
								type="text"
								id="login"
								name="login"
								className="border-cyan-500 border-2 rounded-lg w-[140%] h-8 px-2 py-4"
								value={login}
								onChange={(e) => setLogin(e.target.value)}
								minLength={5}
								maxLength={30}
								required="required"
							/>
							<p className="mt-4">SENHA:</p>
							<input
								type="password"
								id="senha"
								name="senha"
								className="border-cyan-500 border-2 rounded-lg w-[140%] h-8 px-2 py-4"
								value={senha}
								onChange={(e) => {
									setSenha(e.target.value);
									handleChange(e.target.value);
								}}
								minLength={6}
								maxLength={20}
								required="required"
							/>
							<div className={lowerValidated ? "validated" : "not-validated"}>
								{lowerValidated ? (
									<span style={{ color: "#006400", marginRight: "10px" }}>
										<Icon icon={arrows_circle_check} />
									</span>
								) : (
									<span style={{ marginRight: "10px" }}>
										<Icon icon={basic_exclamation} />
									</span>
								)}
								<span className="text-sm">Letras minúsculas</span>
							</div>
							<div className={upperValited ? "validated" : "not-validated"}>
								{upperValited ? (
									<span style={{ color: "#006400", marginRight: "10px" }}>
										<Icon icon={arrows_circle_check} />
									</span>
								) : (
									<span style={{ marginRight: "10px" }}>
										<Icon icon={basic_exclamation} />
									</span>
								)}
								<span className="text-sm">Letras maiúsculas</span>
							</div>

							<div className={numberValited ? "validated" : "not-validated"}>
								{numberValited ? (
									<span style={{ color: "#006400", marginRight: "10px" }}>
										<Icon icon={arrows_circle_check} />
									</span>
								) : (
									<span style={{ marginRight: "10px" }}>
										<Icon icon={basic_exclamation} />
									</span>
								)}
								<span className="text-sm">Números</span>
							</div>

							<div className={specialValited ? "validated" : "not-validated"}>
								{specialValited ? (
									<span style={{ color: "green", marginRight: "10px" }}>
										<Icon icon={arrows_circle_check} />
									</span>
								) : (
									<span style={{ marginRight: "10px" }}>
										<Icon icon={basic_exclamation} />
									</span>
								)}
								<span className="text-sm">Caracter Especial</span>
							</div>

							<div className={lengthValited ? "validated" : "not-validated"}>
								{lengthValited ? (
									<span style={{ color: "#006400", marginRight: "10px" }}>
										<Icon icon={arrows_circle_check} />
									</span>
								) : (
									<span style={{ marginRight: "10px" }}>
										<Icon icon={basic_exclamation} />
									</span>
								)}
								<span className="text-sm">Mais de 6 caracteres</span>
							</div>
						</div>

						<div className="">
							<p>NOME:</p>
							<input
								type="text"
								id="nome"
								name="nome"
								className="border-cyan-500 border-2 rounded-lg w-[135%] h-8 px-2 py-4"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								min={5}
								maxLength={60}
								required="required"
							/>
							<p className="mt-4">FUNÇÃO:</p>
							<select
								id="select"
								name="funcao"
								value={funcao}
								onChange={(e) => setFuncao(e.target.value)}
								className="border-cyan-500 border-2 rounded-lg w-[135%] h-8 px-2 py-4"
							>
								<option value="">Selecione uma atribuição...</option>
								<option value="1">Administrador</option>
								<option value="2">Modificador</option>
								<option value="3">Monitorador</option>
							</select>
						</div>
					</div>
					<div className="flex justify-center gap-12">
						<button
							className="bg-gray-300 text-center px-8 py-2 rounded-lg"
							onClick={() => navigate("/painel/usuarios")}
						>
							VOLTAR
						</button>
						<button className="bg-[#42B8DE] text-center px-8 py-2 rounded-lg" onClick={() => inputsValue()}>
							CADASTRAR
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cadastro;
