import './App.css';
import Home from './components/Home';
import Users from './components/Users';
import About from './components/About';
import {BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Nav} from 'react-bootstrap';


function App() {

  return (
    <div className="App">
      <h2 className='my-5'>Aplicação CRUD - ReactJs | React Bootstrap | Live search </h2>
      <BrowserRouter>

      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/users">Usuários</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/about">Sobre o app</Nav.Link>
        </Nav.Item>
      </Nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
