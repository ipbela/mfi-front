import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CadastroButton, Add, Search } from './style';

function CadastroComponentes() {
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
              <Form.Label>PN</Form.Label>
              <Form.Control
                type="text"
                placeholder="71880000XX"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="ZZ180"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gaveta"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fabricante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Casafer"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width:"100%"}}>
              <Form.Label>Observações : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Já utilizado no proj X"
                autoFocus/>
            </Form.Group>
            
            </div>
            <div style={{width:"50%"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dimensão</Form.Label>
              <Form.Control
                type="number"
                placeholder="10x10x10"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>2D/3D</Form.Label>
              <Form.Control
                type="file"
                placeholder="link"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>LPP</Form.Label>
              <Form.Control
                type="text"
                placeholder="23PM002"
                autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nº Padronização</Form.Label>
              <Form.Control
                type="number"
                placeholder="20.20.96.00.180"
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

export default CadastroComponentes;