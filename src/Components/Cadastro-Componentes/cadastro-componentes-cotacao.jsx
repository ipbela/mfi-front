import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CadastroButton, Add, Search } from './style';

function CadastroComponentesCotacao() {
  const [show, setShow] = useState(false);
  const handleOpenModal = () => {setShow(true);};
  const handleCloseModal = () => {setShow(false);};
  const handleAddClick = (event) => {
    event.preventDefault(); // Impede a propagação do evento de clique
    handleOpenModal();};

  return (
    <>
        <form action="">
          <input type="text" placeholder="Search ..."/>
          <Search>Search</Search>
          <Add onClick={handleAddClick}>+</Add>
        </form>

      <Modal show={show} onHide={handleCloseModal} style={{ 
        backgroundColor:"transparent",
        height:"100%",
        marginTop:"1%"}} >
        <Modal.Header closeButton data-bs-theme="dark" style={{backgroundColor:"#030303"}} >
          <Modal.Title style={{color: "#03e9f4", backgroundColor:"transparent"}}>Cadastro Componentes</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"#fff"}}>
        <Form>
          <div style={{display:"flex"}}>
            <div style={{width:"50%", marginRight:"5%"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cilindro de Nitrogênio"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Componente"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dimensão</Form.Label>
              <Form.Control
                type="number"
                placeholder="50x100"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nitrocut"
                autoFocus/>
            </Form.Group>
            
            </div>
            <div style={{width:"50%"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contato</Form.Label>
              <Form.Control
                type="text"
                placeholder="nitrocut@gmail.com"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Custo</Form.Label>
              <Form.Control
                type="number"
                placeholder="R$250/un"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                placeholder="06/02/2018"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Links : </Form.Label>
              <Form.Control
                type="file"
                placeholder="//http"
                autoFocus/>
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

export default CadastroComponentesCotacao;