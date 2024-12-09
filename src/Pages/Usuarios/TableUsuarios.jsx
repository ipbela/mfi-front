import React, { useState, useEffect } from "react";
import HeaderComponent from "../../Components/Header/header";
import Seta from "../../Assets/Imagens/seta.svg";
import Excluir from "../../Assets/Imagens/lixeira.png";
import Editar from "../../Assets/Imagens/edit.png";
import './style.css';
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

const TableUsuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 5;
  const [userToDelete, setUserToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const listUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8001/api/v1/users/");
      setUsers(response.data);
    } catch (error) {
      console.log("Erro ao listar usuários: ", error);
    }
  };

  const deleteUser = async () => {
    try {
      if (userToDelete) {
        await axios.delete(`http://127.0.0.1:8001/api/v1/users/${userToDelete}`);
        setShowModal(false);
        listUsers();
      }
    } catch (error) {
      console.log("Erro ao deletar o usuário:", error);
    }
  };

  const handleDeleteClick = (user_id) => {
    setUserToDelete(user_id);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    navigate("/alteracao/usuarios", { state: { user } });
  };

  useEffect(() => {
    listUsers();
  }, []);

  const getAtribuicaoName = (idAtribuicao) => {
    switch (idAtribuicao) {
      case 1:
        return "Administrador";
      case 2:
        return "Modificador";
      case 3:
        return "Monitorador";
      default:
        return "";
    }
  };

  return (
    <>
      <HeaderComponent />
      <img src={Seta} alt="" className="seta" onClick={() => navigate("/painel/prov")} />
      <div>
        <h1 className="titulo">Tabela de Usuários</h1>
        <button className="register" onClick={() => navigate("/cadastro")}>Adicionar Usuário</button>
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="title">Usuário</th>
              <th className="title">Nome</th>
              <th className="title">Função</th>
              <th className="title">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(indexOfFirstItem, indexOfLastItem).map((user) => (
              <tr key={user.id}>
                <td className="col-user">{user.login}</td>
                <td className="col-nome">{user.nome}</td>
                <td className="col-acesso">{getAtribuicaoName(user.id_atribuicao)}</td>
                <td className="col-acoes">
                  <img
                    src={Excluir}
                    alt="Delete"
                    className="delete-user"
                    onClick={() => handleDeleteClick(user.id)}
                  />
                  <img
                    src={Editar}
                    alt="Edit"
                    className="edit-user"
                    onClick={() => handleEdit(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {[...Array(Math.ceil(users.length / itemsPerPage)).keys()].map((number) => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
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
        <p>Tem certeza que deseja excluir este usuário?</p>
        <div style={{marginTop: '10px'}}>
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
            onClick={deleteUser}
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

export default TableUsuarios;
