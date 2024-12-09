import { Link } from "react-router-dom";
import "./style.css";

export default function Menu() {
	return (
		<aside className="sidebar">
			<div className="nav-list">
				<Link to="/menu" className="nav-link">
					<span className="nav-link-name">MENU</span>
				</Link>
				<Link to="/painel/lpr" className="nav-link">
					<span className="nav-link-name">LPR</span>
				</Link>
				<Link to="/" className="nav-link">
					<span className="nav-link-name">SAIR</span>
				</Link>
			</div>
		</aside>
	);
}
