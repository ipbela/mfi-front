import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/home";
import Menu from "./Pages/Menu/menu";
import Cadastro from "./Pages/Cadastro/cadastro";
import Adicionar from "./Pages/adcLPR/adicionar";
import Excluir from "./Pages/Excluir/excluir";
import Alterações from "./Pages/Alteracoes/formularioAlteracao";
import AdicionarProv from "./Pages/adcProvidencia/adicionarProv";
import Painel from "./Pages/Painel/Painel";
import Providencias from "./Pages/Providencias/Providencia";
import Alteracao from "./Pages/altLPR/alteracao";
import Historico from "./Pages/Historico/Historico";
import Erro from "./Pages/Erro/erro";
import TableUsuarios from "./Pages/Usuarios/TableUsuarios";
import CadastroUpdate from "./Pages/CadastroUpdate/cadastroUpdate";

function RoutesApp() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/cadastro" element={<Cadastro />}></Route>
				<Route path="/menu" element={<Menu />}></Route>
				<Route path="/adicionar/lpr" element={<Adicionar />}></Route>
				<Route path="/adicionar/prov" element={<AdicionarProv />}></Route>
				<Route path="/alteracao/prov" element={<Alterações />}></Route>
				<Route path="/alteracao/lpr" element={<Alteracao />}></Route>
				<Route path="/excluir" element={<Excluir />}></Route>
				<Route path="/erro" element={<Erro />}></Route>
				<Route path="/painel/lpr" element={<Painel />}></Route>
				<Route path="/painel/prov" element={<Providencias />}></Route>
				<Route path="/historico/prov" element={<Historico />}></Route>
				<Route path="/painel/usuarios" element={<TableUsuarios />}></Route>
				<Route path="/alteracao/usuarios" element={<CadastroUpdate />}></Route>
			</Routes>
		</Router>
	);
}

export default RoutesApp;
