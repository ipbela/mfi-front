import React, { useState, useEffect } from "react";
import "./Painel.css";
import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header/header";
import Exluir from "../../Assets/Imagens/lixeira.png";
import Editar from "../../Assets/Imagens/edit.png";
import Olho from "../../Assets/Imagens/lista.png";
import axios from "axios";
import { format, isValid, parseISO } from "date-fns";
import Table from "../../Components/Table/Table";
import Menu from "../../Components/Menu/Menu";

const Painel = () => {
  const [show, setShow] = useState(false);
  const [lprs, setLprs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLpr, setSelectedLpr] = useState(null);
  const [idAtribuicao, setIdAtribuicao] = useState(null);
  const [filtroSituacao, setFiltroSituacao] = useState(""); // filtra a situação
  const [searchTerm, setSearchTerm] = useState(""); // usar para filtrar os produtos
  const [error, setError] = useState(null); // estado para mensagem de erro
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const toggleSidebar = () => setShow(!show);

  const listLprs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8001/api/v1/lprs/");
      setLprs(response.data);
    } catch (error) {
      console.log("Erro ao listar as LPRs:", error);
    }
  };

  const filterSitLprs = async () => {
    try {
      let response;
      if (filtroSituacao !== "") {
        response = await axios.get(`http://127.0.0.1:8001/api/v1/lprs/filtro/situacao/${filtroSituacao}`);
      } else if (searchTerm !== "") {
        response = await axios.get(`http://127.0.0.1:8001/api/v1/lprs/filtro/produto/${searchTerm}`);
      }
      if (response) {
        setLprs(response.data);
        setError(null);
      }
    } catch (error) {
      setLprs([]); 
      setError("Não foi possível encontrar LPR's para esse filtro.");
    }
  };

  useEffect(() => {
    filterSitLprs();
  }, [filtroSituacao, searchTerm])

  const handleEdit = (lpr) => {
    navigate("/alteracao/lpr", { state: { lpr: lpr } });
  };

  const handleView = (lpr) => {
    setSelectedLpr(lpr);
    navigate("/painel/prov", { state: { lpr: lpr } });
  };

  const isButtonEnabled = () => idAtribuicao === "1";

  const isEditLprButton = () => idAtribuicao === "1" || idAtribuicao === "2";

  useEffect(() => {
    listLprs();
    const storedIdAtribuicao = localStorage.getItem("id_atribuicao");
    if (storedIdAtribuicao) {
      setIdAtribuicao(storedIdAtribuicao);
    }
  }, []);

  return (
    <>
      <HeaderComponent />
      <Menu />

      <div className="bg-blue-100 ml-[12%]">
        <div className="bg-red-100 flex justify-between pl-4 pr-24">
          <h1 className="">PAINEL DE LPR's</h1>
          {isButtonEnabled() ? (
            <Link to="/adicionar/lpr">
              <button className=""> + NOVA LPR</button>
            </Link>
          ) : (
            <button
              className=""
              style={{ backgroundColor: "#ddd", cursor: "default" }}
            >
              + NOVA LPR
            </button>
          )}
        </div>
        <div className="">
          <div className="">
            <p>EM ABERTO</p>
            <span className=""></span>
          </div>
          <div className="">
            <p>FINALIZADA</p>
            <span className=""></span>
          </div>
        </div>
      </div>

      <div className="">
        <div className="">
          <input
            type="text"
            placeholder="Procure por um produto..."
            className=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select name="select" className="" value={filtroSituacao} onChange={(e) => setFiltroSituacao(e.target.value)}>
            <option value="">Selecione:</option>
            <option value="false">Em aberto</option>
            <option value="true">Finalizada</option>
          </select>
        </div>
      </div>

      <div className="">
        {error ? (
          <p className="">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th className="">DATA</th>
                <th className="">PRODUTO</th>
                <th className="">NORMA</th>
                <th className="">MOLDE</th>
                <th className="">SITUAÇÃO</th>
                <th className="">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {lprs.slice(indexOfFirstItem, indexOfLastItem).map((lpr) => {
                const date = parseISO(lpr.data);
                const formattedDate = isValid(date)
                  ? format(date, "dd-MM-yyyy")
                  : "";

                return (
                  <tr key={lpr.id_lpr}>
                    <td>{formattedDate}</td>
                    <td>{lpr.produto}</td>
                    <td>{lpr.norma}</td>
                    <td>{lpr.molde}</td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        className={`status-circle ${
                          lpr.situacao === true ? "green" : "red"
                        }`}
                      ></span>
                    </td>
                    <td className="">
                      <img
                        src={Olho}
                        alt="View"
                        className="view-lpr"
                        onClick={() => handleView(lpr)}
                      />
                      <img
                        src={Exluir}
                        alt="Delete"
                        className=""
                        onClick={
                          isButtonEnabled()
                            ? () => navigate("/excluir", { state: { lpr: lpr } })
                            : null
                        }
                        style={
                          isButtonEnabled()
                            ? {}
                            : { backgroundColor: "#ddd", cursor: "default" }
                        }
                      />
                      <img
                        src={Editar}
                        alt="Edit"
                        className=""
                        onClick={
                          isEditLprButton()
                            ? () => handleEdit(lpr)
                            : null
                        }
                        style={
                          isEditLprButton()
                            ? {}
                            : { backgroundColor: "#ddd", cursor: "default" }
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Painel;
