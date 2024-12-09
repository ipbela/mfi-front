import React, { useState, useEffect } from "react";
import "./ComentarioModal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ComentarioModal = ({ provId, onClose }) => {
  const [comentario, setComentario] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const notifyServerError = () =>
    toast.error("Erro ao salvar comentário. Tente novamente mais tarde!");

  const notifyRegister = () =>
    toast.success("Comentário salvo com sucesso!");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString();
    setCurrentDate(formattedDate);
  }, []);

  const handleSave = async () => {
    try {
      await axios.post("http://127.0.0.1:8001/api/v1/historico_provs/", {
        comentario: comentario,
        data: currentDate,
        responsavel: localStorage.getItem("nome"),
        id_providencia: provId
      });
      notifyRegister();
      onClose();
    } catch (error) {
      notifyServerError();
    }
  };

  return (
    <div className="modal-overlay-coment">
      <div className="modal-content-coment">
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
        <div className="user-box-coment">
          <p>Ação Realizada:</p>
          <textarea
            type="text"
            id="comentario"
            name="comentario"
            value={comentario}
            placeholder="Escreva alguma alteração ou mudança aqui"
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <div className="modal-buttons-coment">
          <button className="Submitbutton-coment" onClick={onClose}>CANCELAR</button>
          <button className="Submitbutton1-coment" onClick={handleSave}>SALVAR</button>
        </div>
      </div>
    </div>
  );
};

export default ComentarioModal;
