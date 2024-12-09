import React, { useState } from "react";
import Seta from "../../Assets/Imagens/seta.svg";
import HeaderComponent from "../../Components/Header/header";
import axios from "axios";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdicionarProv() {
  const location = useLocation();
  const lpr = location.state?.lpr || {};

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

  const navigate = useNavigate();

  const valuesNull = () =>
    toast.error("Preencha todos os campos obrigatórios, por favor!");
  const errorRegister = () =>
    toast.error("Erro ao registrar providência. Tente novamente mais tarde.");
  const registerProvNotification = () => toast.success("Providência cadastrada com sucesso.");

  const registerProv = async () =>
    axios
      .post("http://127.0.0.1:8001/api/v1/provs/", {
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
        id_lpr: lpr,
      })
      .then(function () {
        registerProvNotification();
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
      })
      .catch(function () {
        errorRegister();
      });

  const inputsValue = async () => {
    if (!responsavel || !numero || !prioridade || !problema || !pdca) {
      valuesNull();
      return;
    }
    registerProv();
  };

  // const navi = async () => {
  //     navigate("/painel/prov", { state: { lpr: lpr, refresh: true } });
  // }

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
      <div className="container" style={{ marginTop: "5%" }}>
        {/* <img src={Seta} alt="" onClick={navi} /> */}
        <div className="box-prov">
          <div className="col1">
            <div className="box-input">
              <label>
                RESPONSÁVEL: <span className="vermelho">*</span>
              </label>
              <br />
              <input
                className="text-prov"
                type="text"
                value={responsavel}
                placeholder="Digite o responsável"
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </div>
            <div className="box-input">
              <label>PARTICIPANTES:</label>
              <br />
              <input
                className="text-prov"
                type="text"
                value={participantes}
                placeholder="Digite os participantes"
                onChange={(e) => setParticipantes(e.target.value)}
              />
            </div>
            <div className="col3">
              <div className="box-input">
                <label>
                  N°: <span className="vermelho">*</span>
                </label>
                <br />
                <input
                  className="input-number"
                  type="number"
                  value={numero}
                  placeholder="Digite o número"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div className="box-input">
                <label>
                  PRIORIDADE: <span className="vermelho">*</span>
                </label>
                <br />
                <input
                  className="text-prov-prioridade"
                  type="text"
                  value={prioridade}
                  placeholder="Digite a prioridade"
                  onChange={(e) => setPrioridade(e.target.value)}
                />
              </div>
            </div>
            <div className="col3">
              <div className="box-input">
                <label>PRAZO:</label>
                <br />
                <input
                  className="date-prov-prazo"
                  type="date"
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)}
                />
              </div>
              <div className="box-input" style={{ marginLeft: "50px" }}>
                <label>PREDECESSORA:</label>
                <br />
                <input
                  className="text-prov-predecessora"
                  type="text"
                  value={predecessora}
                  placeholder="Digite a predecessora"
                  onChange={(e) => setPredecessora(e.target.value)}
                />
              </div>
            </div>
            <div className="box-input">
              <label>DATA FINAL:</label>
              <br />
              <input
                className="date-prov"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>

          <div className="col2">
            <div className="box-input">
              <label>
                PROBLEMA: <span className="vermelho">*</span>
              </label>
              <br />
              <input
                className="text-prov"
                type="text"
                value={problema}
                placeholder="Digite o problema"
                onChange={(e) => setProblema(e.target.value)}
              />
            </div>
            <div className="box-input">
              <label>PROVIDÊNCIA:</label>
              <br />
              <input
                className="text-prov"
                type="text"
                value={providencias}
                placeholder="Digite a providência"
                onChange={(e) => setProvidencias(e.target.value)}
              />
            </div>
            <div className="box-input">
              <label>CONSENSO:</label>
              <br />
              <input
                className="text-prov"
                type="text"
                value={consenso}
                placeholder="Digite o consenso"
                onChange={(e) => setConsenso(e.target.value)}
              />
            </div>
            <div className="box-input">
              <label>
                Ciclo PDCA: <span className="vermelho">*</span>
              </label>
              <br />
              <select
                id="select"
                className="text-prov"
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
          </div>
        </div>
        <button className="botao-submit" onClick={inputsValue}>
          ADICIONAR PROVIDÊNCIA
        </button>
      </div>
      <Outlet />
    </>
  );
}

export default AdicionarProv;
