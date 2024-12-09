import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CadastroButton, Add, Search } from './style';

function CadastroProjetosCotacao() {
  const [show, setShow] = useState(false);
  const handleOpenModal = () => {setShow(true);};
  const handleCloseModal = () => {setShow(false);};
  const handleAddClick = (event) => {
    event.preventDefault(); // Impede a propagação do evento de clique
    handleOpenModal();};

  return (
    <>
      <form action="">
          <input type="text" placeholder='Search ...'/>
          <Search>Search</Search>
          <Add onClick={handleAddClick}>+</Add>
        </form>


      <Modal show={show} onHide={handleCloseModal} style={{ 
        backgroundColor:"transparent",
        height:"100%",
        marginTop:"1%"}} >
        <Modal.Header closeButton data-bs-theme="dark" style={{backgroundColor:"#030303"}} >
          <Modal.Title style={{color: "#03e9f4", backgroundColor:"transparent", fontWeight:"1000"}}>Cadastro Projetos</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"#fff"}}>
        <Form>
          <div style={{display:"flex"}}>
            <div style={{width:"50%", marginRight:"5%", color: "aqua"}}>
            <Form.Group className="mb-3">
              <Form.Label>Projeto</Form.Label>
              <Form.Control type="text" placeholder="P00001777" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vendedor</Form.Label>
              <Form.Control type="text" placeholder="Jacundino / Jean / Laranjeira" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control type="text" placeholder="Polimold" autoFocus/>
            </Form.Group> 
            </div>
            <div style={{width:"50%", color: "aqua"}}>
            <Form.Group className="mb-3">
              <Form.Label>Responsável</Form.Label>
              <Form.Control type="text" placeholder="Luiz / João" autoFocus/>
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Data de Inicio</Form.Label>
              <Form.Control type="date"  autoFocus/>
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Data Requerida</Form.Label>
              <Form.Control type="date"  autoFocus/>
            </Form.Group> 
            </div>
          </div>
            
          <CadastroButton>Cadastrar</CadastroButton>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CadastroProjetosCotacao;