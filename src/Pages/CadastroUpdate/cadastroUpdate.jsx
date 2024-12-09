import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import SIV from "../../Assets/Imagens/logo1SIV-semfundo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "react-icons-kit";
import { basic_exclamation } from "react-icons-kit/linea/basic_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";

function CadastroUpdate() {
  const location = useLocation();
  const user = location.state?.user || {};

  const [login, setLogin] = useState(user.login || "");
  const [nome, setNome] = useState(user.nome || "");
  const [senha, setSenha] = useState("");
  const [funcao, setFuncao] = useState(user.id_atribuicao || "");

  const navigate = useNavigate();

  // Validation states
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  useEffect(() => {
    if (senha) {
      handleChange(senha);
    }
  }, [senha]);

  const handleChange = (value) => {
    // Regex
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*-])");
    const length = new RegExp("(?=.{6,})");

    // Lowercase validation
    setLowerValidated(lower.test(value));

    // Uppercase validation
    setUpperValidated(upper.test(value));

    // Number validation
    setNumberValidated(number.test(value));

    // Special character validation
    setSpecialValidated(special.test(value));

    // Length validation
    setLengthValidated(length.test(value));
  };

  const notifyError = () =>
    toast("Este login já está em uso. Por favor escolha outro!");
  const notifyLogin = () => toast("Por favor, preencha o login");
  const notifySenha = () => toast("Por favor, preencha a senha");
  const notifyNome = () => toast("Por favor, preencha o nome");
  const notifyFuncao = () => toast("Por favor, escolha uma função");
  const notifySenhaConfirm = () =>
    toast(
      "Por favor, certifique-se de atender todos os critérios de segurança da senha."
    );
  const notifyConfirm = () => toast("Funcionário atualizado com sucesso!");
  const notifyNomeNumerico = () => toast("O nome deve conter apenas letras");

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8001/api/v1/users/${user.id}`,
        {
          login: login,
          nome: nome,
          senha: senha,
          id_atribuicao: funcao,
        }
      );
      console.log(response);
      navigate("/painel/usuarios");
      notifyConfirm();
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <>
      <div className="MaincontentCadastro">
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
        <div className="Cadastro">
          <img src={SIV} alt="" className="logo-siv-cadastro" />
          <div className="box-geral">
            <div className="primeiro-box">
              <p>LOGIN:</p>
              <input
                type="text"
                id="login"
                name="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                minLength={5}
                maxLength={15}
                required="required"
              />
              <p>SENHA:</p>
              <input
                type="password"
                id="senha"
                name="senha"
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
                Letras minúsculas
              </div>
              <div className={upperValidated ? "validated" : "not-validated"}>
                {upperValidated ? (
                  <span style={{ color: "#006400", marginRight: "10px" }}>
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span style={{ marginRight: "10px" }}>
                    <Icon icon={basic_exclamation} />
                  </span>
                )}
                Letras maiúsculas
              </div>

              <div className={numberValidated ? "validated" : "not-validated"}>
                {numberValidated ? (
                  <span style={{ color: "#006400", marginRight: "10px" }}>
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span style={{ marginRight: "10px" }}>
                    <Icon icon={basic_exclamation} />
                  </span>
                )}
                Números
              </div>

              <div className={specialValidated ? "validated" : "not-validated"}>
                {specialValidated ? (
                  <span style={{ color: "green", marginRight: "10px" }}>
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span style={{ marginRight: "10px" }}>
                    <Icon icon={basic_exclamation} />
                  </span>
                )}
                Caracter Especial
              </div>

              <div className={lengthValidated ? "validated" : "not-validated"}>
                {lengthValidated ? (
                  <span style={{ color: "#006400", marginRight: "10px" }}>
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span style={{ marginRight: "10px" }}>
                    <Icon icon={basic_exclamation} />
                  </span>
                )}
                Mais de 6 caracteres
              </div>
            </div>

            <div className="segundo-box">
              <p>NOME:</p>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                minLength={5}
                maxLength={60}
                required="required"
              />
              <p>FUNÇÃO:</p>
              <select
                id="select"
                name="funcao"
                value={funcao}
                onChange={(e) => setFuncao(e.target.value)}
                className="select-funcao"
              >
                <option value="">Selecione uma atribuição...</option>
                <option value="1">Administrador</option>
                <option value="2">Modificador</option>
                <option value="3">Monitorador</option>
              </select>
            </div>
          </div>
          <div className="btns-cad">
            <button
              className="Cancelbuttom"
              onClick={() => navigate("/painel/usuarios")}
            >
              VOLTAR
            </button>
            <button className="Submitbuttom" onClick={updateUser}>
              SALVAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroUpdate;
