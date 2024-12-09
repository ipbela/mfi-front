import React, { useState, useEffect } from "react";
import { TableStyle } from "./style";
import axios from "axios";
import { format, parseISO, isValid } from "date-fns";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Modal from "react-modal";
import Exluir from "../../Assets/Imagens/lixeira.png";
import Olho from "../../Assets/Imagens/lista.png";
import Editar from "../../Assets/Imagens/edit.png";
import CircularProgressBar from "./CircularProgressBar";

export default function Table({lpr}) {
	const [provs, setProvs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [provToDelete, setProvToDelete] = useState(null);
	const [selectedProv, setSelectedProv] = useState(null);
	const [idAtribuicao, setIdAtribuicao] = useState(null);
	const itemsPerPage = 5;

	const navigate = useNavigate();

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const listProvs = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8001/api/v1/provs/lpr/${lpr.id_lpr}`
			);
			setProvs(response.data);
		} catch (error) {
			console.log("Erro ao listar as providências:", error);
		}
	};

	const deleteProv = async () => {
		try {
			if (provToDelete) {
				await axios.delete(
					`http://127.0.0.1:8001/api/v1/provs/${provToDelete}`
				);
				setShowModal(false);
				listProvs();
			}
		} catch (error) {
			console.log("Erro ao deletar a providência:", error);
		}
	};

	const handleDeleteClick = (prov_id) => {
		setProvToDelete(prov_id);
		setShowModal(true);
	};

	const handleEdit = (prov) => {
		navigate("/alteracao/prov", { state: { prov: prov } });
	};

	const registerNewProv = (lpr) => {
		navigate("/adicionar/prov", { state: { lpr: lpr } });
	};

	const formatDateString = (dateString) => {
		if (!dateString) return "";
		const date = parseISO(dateString);
		return isValid(date) ? format(date, "dd-MM-yyyy") : "";
	};

	const handleView = (prov) => {
		setSelectedProv(prov);
		navigate("/historico/prov", { state: { prov: prov } });
	};

	const isButtonEnabled = () => idAtribuicao === "1";

	const isEditProvButton = () => idAtribuicao === "1" || idAtribuicao === "2";

	useEffect(() => {
		if (lpr.id_lpr) {
			listProvs();
		}

		const storedIdAtribuicao = localStorage.getItem("id_atribuicao");
		if (storedIdAtribuicao) {
			setIdAtribuicao(storedIdAtribuicao);
		}

		console.log(provs);

	}, [lpr]);

	if (idAtribuicao === null) {
		return <div>Carregando...</div>;
	}

	return (
		<>
			<div>
				<h1 style={{ marginLeft: "-82%" }}>PROVIDÊNCIAS</h1>
				{isButtonEnabled() ? (
					<h1
					style={{
						fontSize: "1rem",
						marginTop: "20px",
						backgroundColor: "#42B8DE",
						paddingLeft: "20px",
						paddingRight: "20px",
						paddingTop: "12px",
						color: "#fafafa",
						cursor: "pointer",
						borderRadius: "10px",
						transition: "0.5s",
						width: "280px",
						height: "50px",
						marginLeft: "1%",
					}}
					className="register"
					onClick={() => registerNewProv(lpr.id_lpr)}
				>
					Adicionar Providência
				</h1>
				) : (
					<h1
					style={{
						fontSize: "1rem",
						marginTop: "20px",
						backgroundColor: "#ddd",
						paddingLeft: "20px",
						paddingRight: "20px",
						paddingTop: "12px",
						color: "#fafafa",
						cursor: "default",
						borderRadius: "10px",
						transition: "0.5s",
						width: "280px",
						height: "50px",
						marginLeft: "1%",
					}}
					className="register"
				>
					Adicionar Providência
				</h1>
				)}
				
			</div>
			<div className="table-container1">
				<table className="white-bg">
					<tbody>
						<tr>
							<td>
								<strong>Data:</strong>
							</td>
							<td>
								<strong>Produto:</strong>
							</td>
							<td>
								<strong>Norma:</strong>
							</td>
							<td>
								<strong>Molde:</strong>
							</td>
						</tr>

						<tr>
							<td>{formatDateString(lpr.data)}</td>
							<td>{lpr.produto}</td>
							<td>{lpr.norma}</td>
							<td>{lpr.molde}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<TableStyle>
				<thead>
					<tr>
						<th className="column-participantes">PARTICIPANTES</th>
						<th className="column-numero">No.</th>
						<th className="column-prioridade">PRIO</th>
						<th className="column-problema">PROBLEMA</th>
						<th className="column-predecessora">PRED.</th>
						<th className="column-providencia">PROVIDENCIA</th>
						<th className="column-responsavel">RESP.</th>
						<th className="column-prazo">Pz.</th>
						<th className="column-consenso">CONSENSO</th>
						<th className="column-data">DATA</th>
						<th className="column-pdca">PDCA</th>
						<th className="column-actions">AÇÕES</th>
					</tr>
				</thead>
				<tbody>
					{provs.slice(indexOfFirstItem, indexOfLastItem).map((prov) => (
						<tr key={prov.id_providencia} style={{ border: "1px solid black" }}>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.participantes}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.numero}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.prioridade}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.problema}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.predecessora}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.providencias}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.responsavel}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{formatDateString(prov.prazo)}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{prov.consenso}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								{formatDateString(prov.dataFim)}
							</td>
							<td style={{ border: "1px solid black" }} className={"border1"}>
								<CircularProgressBar pdca={prov.pdca} />
							</td>
							<td>
								<img
									src={Olho}
									alt="View"
									className="view-prov"
									onClick={() => handleView(prov)}
								></img>
								<img
									src={Exluir}
									alt="Delete"
									className="delete-prov"
									onClick={isButtonEnabled() ? () => handleDeleteClick(prov.id_providencia) : null}
									style={isButtonEnabled() ? { marginLeft: "10px" } : { marginLeft: "10px", backgroundColor: '#ddd', cursor: 'default' }}
								></img>
								<img
									src={Editar}
									alt="Edit"
									className="edit-prov"
									onClick={isEditProvButton() ? () => handleEdit(prov) : null}
									style={isEditProvButton() ? { marginLeft: "10px" } : { marginLeft: "10px", backgroundColor: '#ddd', cursor: 'default' }}
								></img>
							</td>
						</tr>
					))}
				</tbody>
			</TableStyle>

			<div className="pagination">
				{Array.from({ length: Math.ceil(provs.length / itemsPerPage) }).map(
					(_, index) => (
						<button
							key={index + 1}
							onClick={() => paginate(index + 1)}
							className={currentPage === index + 1 ? "active" : ""}
						>
							{index + 1}
						</button>
					)
				)}
			</div>

			<Modal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
				contentLabel="Confirmar exclusão"
				style={{
					content: {
						width: "400px",
						height: "200px",
						margin: "auto",
						textAlign: "center",
						background: "whitesmoke",
					},
				}}
			>
				<h2>Confirmar exclusão</h2>
				<p>Tem certeza que deseja excluir esta providência?</p>
				<div>
					<button
						onClick={() => setShowModal(false)}
						style={{
							marginRight: "20px",
							padding: "10px 20px",
							background: "gray",
							color: "white",
							border: "none",
							borderRadius: "5px",
						}}
					>
						Cancelar
					</button>
					<button
						onClick={deleteProv}
						style={{
							padding: "10px 20px",
							background: "red",
							color: "white",
							border: "none",
							borderRadius: "5px",
						}}
					>
						Excluir
					</button>
				</div>
			</Modal>
		</>
	);
}
