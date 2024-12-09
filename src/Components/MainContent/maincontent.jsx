import React, { useState, useEffect } from "react";

function MainContentComponent() {
    const [data, setData] = useState("");
    const [participantes, setParticipantes] = useState("");
    const [num, setNum] = useState("");
    const [problema, setProblema] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [prazo, setPrazo] = useState("");
    const [situacao, setSituacao] = useState("");
    const [cadastrados, setCadastrados] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("cadastrados", JSON.stringify(data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoCadastro = {
            data,
            participantes,
            num,
            problema,
            responsavel,
            prazo,
            situacao,
        };

        const updatedCadastrados = [...cadastrados, novoCadastro];
        setCadastrados(updatedCadastrados);
        setData("");
        setParticipantes("");
        setNum("");
        setProblema("");
        setResponsavel("");
        setPrazo("");
        setSituacao("");
        saveDataToLocalStorage(updatedCadastrados);
    };

    const handleDelete = (index) => {
        const updatedCadastrados = cadastrados.filter((_, i) => i !== index);
        setCadastrados(updatedCadastrados);
        saveDataToLocalStorage(updatedCadastrados);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleConfirmEdit = () => {
        const updatedCadastrados = [...cadastrados];
        updatedCadastrados[editIndex] = {
            data,
            participantes,
            num,
            problema,
            responsavel,
            prazo,
            situacao,
        };
        setCadastrados(updatedCadastrados);
        setData("");
        setParticipantes("");
        setNum("");
        setProblema("");
        setResponsavel("");
        setPrazo("");
        setSituacao("");
        saveDataToLocalStorage(updatedCadastrados);
        setEditIndex(null);
    };

    const handleDeleteAll = () => {
        setCadastrados([]);
        localStorage.removeItem("cadastrados");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("cadastrados"));
        if (storedData) {
            setCadastrados(storedData);
        }
    }, []);

    return (
        <>
            <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
                <div
                    style={{
                        marginLeft: "230px",
                        color: "white",
                        marginBottom: "80px"
                    }}
                >
                    <h2>Cadastro</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="data">Data:</label>
                            <input
                                type="date"
                                id="data"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    marginBottom: "10px",
                                    border: "1px solid white",
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="participantes">Participantes:</label>
                            <input
                                type="text"
                                id="participantes"
                                value={participantes}
                                onChange={(e) => setParticipantes(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    marginBottom: "10px",
                                    border: "1px solid white",
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="num">Numero:</label>
                            <input
                                type="number"
                                id="numero"
                                value={num}
                                onChange={(e) => setNum(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    border: "1px solid white",
                                    marginBottom: "10px",
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="problema">Problema:</label>
                            <input
                                type="text"
                                id="problema"
                                value={problema}
                                onChange={(e) => setProblema(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    marginBottom: "10px",
                                    border: "1px solid white",
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="responsavel">Responsável:</label>
                            <input
                                type="text"
                                id="responsavel"
                                value={responsavel}
                                onChange={(e) => setResponsavel(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    marginBottom: "10px",
                                    border: "1px solid white",
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="prazo">Prazo:</label>
                            <input
                                type="date"
                                id="prazo"
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    marginBottom: "10px",
                                    border: "1px solid white",
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="situacao">Situação:</label>
                            <input
                                type="text"
                                id="situacao"
                                value={situacao}
                                onChange={(e) => setSituacao(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    background: "white",
                                    marginBottom: "10px",
                                    border: "1px solid white",
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                background: "white",
                                marginTop: "30px",
                                width: "150px",
                                height: "40px",
                            }}
                            required
                        >
                            Cadastrar
                        </button>
                    </form>
                </div>
                <div
                    style={{
                        marginTop: "20px",
                        color: "white",
                        marginLeft: "230px",
                    }}
                >
                    <h2>Lista de Cadastros</h2>
                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Data
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Participantes
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Número
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Problema
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Responsável
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Prazo
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Situação
                                </th>
                                <th style={{ border: "1px solid white", padding: "8px" }}>
                                    Funções
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cadastrados.map((cadastro, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {formatDate(cadastro.data)}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {cadastro.participantes}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {cadastro.num}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {cadastro.problema}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {cadastro.responsavel}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {formatDate(cadastro.prazo)}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {cadastro.situacao}
                                    </td>
                                    <td style={{ border: "1px solid white", padding: "8px" }}>
                                        {editIndex !== index ? (
                                            <>
                                                <button
                                                    style={{
                                                        background: "white",
                                                        width: "80px",
                                                        height: "40px",
                                                    }}
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    Editar
                                                </button>
                                                <button style={{
                                                        background: "white",
                                                        width: "80px",
                                                        height: "40px",
                                                    }} onClick={() => handleDelete(index)}>Excluir</button>
                                            </>
                                        ) : (
                                            <button
                                                style={{
                                                    background: "white",
                                                    width: "150px",
                                                    height: "40px",
                                                }}
                                                onClick={handleConfirmEdit}
                                            >
                                                Confirmar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handleDeleteAll}
                        style={{
                            background: "white",
                            width: "150px",
                            height: "40px",
                            marginTop: "40px",
                        }}
                    >
                        Apagar Registros
                    </button>
                </div>
            </div>
        </>
    );
}

export default MainContentComponent;
