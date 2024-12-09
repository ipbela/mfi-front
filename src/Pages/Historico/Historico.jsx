import React, { useState, useEffect } from "react";
import HeaderComponent from "../../Components/Header/header";
import Seta from "../../Assets/Imagens/seta.svg";
import Exluir from "../../Assets/Imagens/lixeira.png";
import ComentarioModal from "./ComentarioModal";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const Historico = () => {
  const location = useLocation();
  const prov = location.state?.prov || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [historicoProvs, setHistoricoProvs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idAtribuicao, setIdAtribuicao] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [histToDelete, setHistToDelete] = useState(null);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const listHistProvs = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8001/api/v1/historico_provs/${prov.id_providencia}`
      );
      setHistoricoProvs(response.data);
    } catch (error) {
      console.log("Erro ao listar o histórico das providências: ", error);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${formattedDate} - ${formattedTime}`;
  };

  const deleteHist = async () => {
		try {
			if (histToDelete) {
				await axios.delete(
					`http://127.0.0.1:8001/api/v1/historico_provs/${histToDelete}`
				);
				setShowModal(false);
				listHistProvs();
			}
		} catch (error) {
			console.log("Erro ao deletar histórico:", error);
		}
	};

  const handleDeleteClick = (hist_id) => {
    setHistToDelete(hist_id);
    setShowModal(true);
  };

  const isButtonEnabled = () => idAtribuicao === "1";

  useEffect(() => {
    if (prov.id_providencia) {
      listHistProvs();
    }
    const storedIdAtribuicao = localStorage.getItem("id_atribuicao");
    if (storedIdAtribuicao) {
      setIdAtribuicao(storedIdAtribuicao);
    }
  }, [prov]);

  if (idAtribuicao === null) {
    return <div>Carregando...</div>;
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    listHistProvs();
  };

  return (
    <>
      <HeaderComponent />
      <img
        src={Seta}
        alt=""
        className="seta"
        onClick={() => navigate("/painel/prov")}
      />
      <div>
        <h1 className="titulo">HISTÓRICO</h1>
        <button className="register" onClick={() => setIsModalOpen(true)}>
          Adicionar Ação
        </button>
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="title">Data</th>
              <th className="title">Ações Realizadas</th>
              <th className="title">Responsável</th>
              <th className="title">Ações</th>
            </tr>
          </thead>
          <tbody>
            {historicoProvs
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((hist) => (
                <tr key={hist.id_historico_providencias}>
                  <td className="col-data">{formatDateTime(hist.data)}</td>
                  <td className="col-comentario">{hist.comentario}</td>
                  <td className="col-responsavel">{hist.responsavel}</td>
                  <td className="col-acoes">
                    <img
                      src={Exluir}
                      alt="Delete"
                      className="delete-prov"
                      onClick={
                        isButtonEnabled()
                          ? () =>
                              handleDeleteClick(hist.id_historico_providencias)
                          : null
                      }
                      style={
                        isButtonEnabled()
                          ? { marginLeft: "50px" }
                          : {
                              marginLeft: "50px",
                              backgroundColor: "#ddd",
                              cursor: "default",
                            }
                      }
                    ></img>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {[...Array(Math.ceil(historicoProvs.length / itemsPerPage)).keys()].map(
          (number) => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          )
        )}
      </div>

      {isModalOpen && (
        <ComentarioModal
          provId={prov.id_providencia}
          onClose={handleModalClose}
        />
      )}

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
        <p>Tem certeza que deseja excluir este histórico?</p>
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
            onClick={deleteHist}
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
};

export default Historico;
