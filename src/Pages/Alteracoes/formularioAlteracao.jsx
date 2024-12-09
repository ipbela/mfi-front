import React, { useState, useEffect } from "react";
import HeaderComponent from "../../Components/Header/header";
import Seta from "../../Assets/Imagens/seta.svg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";

function Alterações() {
  const location = useLocation();
  const prov = location.state?.prov || {};

  const [responsavel, setResponsavel] = useState("");
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
  const [idLpr, setIdLpr] = useState("");
  const [dataModificacao, setDataModificacao] = useState("");

  const navigate = useNavigate();

  const getDate = () => {
    const atual = new Date();
    const dia = atual.getDay();
    const mes = atual.getMonth();
    const ano = atual.getFullYear();
    const hora = atual.getHours();
    const minuto = atual.getMinutes();

    return `${dia}/${mes}/${ano} - ${hora}:${minuto}`
  }


  useEffect(() => {
    if (prov) {
      setResponsavel(prov.responsavel || "");
      setParticipantes(prov.participantes || "");
      setNumero(prov.numero || "");
      setPrioridade(prov.prioridade || "");
      setPrazo(prov.prazo || "");
      setPredecessora(prov.predecessora || "");
      setDataFim(prov.dataFim || "");
      setProblema(prov.problema || "");
      setProvidencias(prov.providencias || "");
      setConsenso(prov.consenso || "");
      setPdca(prov.pdca || "");
      setIdLpr(prov.id_lpr || "");
      setDataModificacao(prov.data_edicao || "Sem data de modificação");
    }
  }, [prov]);

  const valuesNull = () => toast.error("Preencha todos os campos, por favor!");
  const errorRegister = () =>
    toast.error("Erro ao registrar providência. Tente novamente mais tarde.");
  const editProv = () => toast.success("Providência editada com sucesso.");

  const inputsValue = () => {
    if (!responsavel || !numero || !prioridade || !problema || !pdca) {
      valuesNull();
      return;
    }

    updateProvidencia();
  };

  const updateProvidencia = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8001/api/v1/provs/${prov.id_providencia}`,
        {
          responsavel,
          participantes,
          numero,
          prioridade,
          prazo: prazo,
          predecessora,
          dataFim: dataFim,
          problema,
          providencias,
          consenso,
          pdca,
          id_lpr: idLpr,
          data_edicao: getDate()
        }
      );
      editProv();
    } catch (error) {
      errorRegister();
    }
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
      <div className="container" style={{ marginTop: "3%" }}>
        {/* <img src={Seta} alt="" onClick={() => navigate("/painel/prov")} /> */}
        <p className="modificacao">Última modificação: {dataModificacao}</p>
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
          SALVAR PROVIDÊNCIA
        </button>
      </div>
    </>
  );
}

export default Alterações;
