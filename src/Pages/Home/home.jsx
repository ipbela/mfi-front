import React, { useState } from "react";
import SIV from "../../Assets/Imagens/logo1SIV-semfundo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);
  const notifyServerError = () =>
    toast.error("Erro ao verificar o login. Por favor, tente novamente!");
  const notifyLogin = () => toast.error("Por favor, preencha os campos");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/v1/users/login",
        {
          login: login,
          senha: senha,
        }
      );
      const { access_token, id_atribuicao, nome } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("id_atribuicao", id_atribuicao);
      localStorage.setItem("nome", nome);
      navigate("/menu");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notifyError(error.response.data.detail);
      } else {
        notifyServerError();
      }
    }
  };

  const inputsValue = async () => {
    if (login === "" || senha === "") {
      notifyLogin();
    } else {
      loginUser();
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
        <div className="border-slate-300 shadow-lg border-2 rounded-lg w-[30%] h-[70%]">
          <img src={SIV} alt="" className="w-24 h-24 ml-[38%] mt-[5%]" />
          <div className="p-8">
            <p>LOGIN:</p>
            <input
              type="text"
              id="login"
              name="login"
              className="border-cyan-500 border-2 rounded-lg w-full h-8 px-2 py-4"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <p className="mt-[5%]">SENHA:</p>
            <input
              type="password"
              id="senha"
              name="senha"
              className="border-cyan-500 border-2 rounded-lg w-full h-8 px-2 py-4"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button className="mt-[6%] bg-[#42B8DE] text-center ml-[35%] px-8 py-2 rounded-lg" onClick={inputsValue}>
            LOGAR
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
