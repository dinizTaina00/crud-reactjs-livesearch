import React, {useState, useEffect} from 'react';
import {Table, Button, Form, Container, Modal, InputGroup} from 'react-bootstrap';
import axios from 'axios';

function Users(props){

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail]= useState('');
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalNew, setModalNew] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const keysSearch = ['name','email']

    const search = (users)=>{
        return users.filter(
            (user)=>
            keysSearch.some(key => user[key].toLowerCase().includes(searchInput))
        )
    }

    useEffect(()=>{
        return getUsers();
    },[])   

    function getUsers() {
        fetch("http://localhost:8000/api/users")
        .then(response => response.json())
        .then(data => {
            return setUsers(data)
        })  
    }

    function deleteUser(id){
        fetch("http://localhost:8000/api/users/"+id, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                return getUsers();
            }
        })
    }

    function loadUserForm(id) {
        fetch("http://localhost:8000/api/users?id="+id, {method: 'GET'})
        .then(response =>  response.json())
        .then(user => {
                setId(id)
                setName(user.name)
                setEmail(user.email)
                openModal();
            })
    }

    function updateUser(id) {
        axios.put("http://localhost:8000/api/users/"+id,{
            name: name,
            email: email
        })
        .then((response) => {
            if (response.status === 200) {
                resetInputs();
                return getUsers();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }


    function saveUser() {
        axios.post("http://localhost:8000/api/users",{
            name: name,
            email: email
        })
        .then((response) => {
            if (response.status === 200) {
                resetInputs();
                getUsers();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

    function updateName(e) {
        setName(e.target.value)
    }

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    async function submit(e){
        e.preventDefault();

        if(id === 0){
            saveUser();
        }else{
            updateUser(id);
        }

        closeModal();
        
    }

    function resetInputs() {
        setId(0);
        setName('');
        setEmail('');
    }

    function closeModal (){
        setModalOpen(false)
    }

    function openModal(modalNew){
        if(modalNew){
            setId(0)
            setName('')
            setEmail('')
        }
        setModalOpen(true)
    }

    function renderTableUsers () {
        return <Table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Opções</th>
            </tr>
        </thead>
        <tbody>
            {
                search(users).map((user)=> (
                <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Button variant="info" onClick={()=> loadUserForm(user._id)}>Editar</Button>
                        <Button variant="danger" onClick={()=> deleteUser(user._id)}>Excluir</Button>
                    </td>
                </tr>
                ))
            }
        </tbody>
    </Table>
    }
    
        return (

            <>
            <Modal show={modalOpen} onHide={() => closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar novo usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={() => submit()}>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" value={id} readOnly={true}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Seu nome e sobrenome</Form.Label>   
                            <Form.Control type="text" placeholder="Informe seu nome..." value={name} onChange={()=>updateName()}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Seu E-mail</Form.Label>
                            <Form.Control type="email" placeholder="Informe seu email..." value={email} onChange={()=>updateEmail()}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container>
            
            <Button className='my-4' variant="success" onClick={() => openModal(modalNew)}>Cadastrar novo usuário</Button>   

            <InputGroup className="mb-3 my-5">
                <Form.Control
                placeholder="Busque pelo usuário"
                aria-label="Username"
                className='search'
                onChange={(e)=>setSearchInput(e.target.value)}
                value={searchInput}
                />
            </InputGroup>

            <div>{renderTableUsers()}</div>
            </Container>
            </>

        )
}

export default Users;