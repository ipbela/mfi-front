import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CadastroButton, Add, Search } from './style';

function CadastroProjetos() {
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
            <div style={{width:"33%", marginRight:"5%", color: "aqua"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Projeto</Form.Label>
              <Form.Control type="text" placeholder="7188009999" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recebimento da Demanda</Form.Label>
              <Form.Control type="date" placeholder="01/05/2023" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Aval. Sobremetal de cav.</Form.Label>
              <Form.Control type="number" placeholder="8 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Corrigir deformações recebidas</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>T0</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sim. de Correção</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>T1</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            
            </div>
            <div style={{width:"33%", marginRight:"5%", color:"aqua"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cliente</Form.Label>
              <Form.Control type="text" placeholder="Polimold" autoFocus/>
            </Form.Group>  
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Avaliação de Desenho</Form.Label>
              <Form.Control type="number" placeholder="10 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Simulação de Injeções</Form.Label>
              <Form.Control type="number" placeholder="7 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Liberações : MP, Usin. e Mont.</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Relatório Dim.</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correções de Proj.</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>OT2</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            
            </div>
            <div style={{width:"33%", color: "aqua"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Data de Início</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" autoFocus/>
            </Form.Group> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Elaboração do Projeto</Form.Label>
              <Form.Control type="number" placeholder="10 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correção de deformações</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Val. Fisica Interface da fer.</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Aval. Result. QMM</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. PP" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Novo Projeto</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Projeto" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Aprovação</Form.Label>
              <Form.Control type="number" placeholder="15 dias" autoFocus/>
              <Form.Control type="text" placeholder="Resp. Prpjeto" autoFocus/>
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

export default CadastroProjetos;