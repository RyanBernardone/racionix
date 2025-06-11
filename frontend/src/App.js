import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';

//Páginas
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import Home from './components/pages/Home';
import Criancas from './components/pages/kid/Criancas';
import Profile from './components/pages/user/Profile';
import AddCrianca from './components/pages/kid/AddCrianca'
import EditKid from './components/pages/kid/EditKid';
import Games from './components/pages/Games';
import { JogoDaMemoria } from './components/pages/games/MemoryGame';

//Contexto
import { UserProvider } from './context/UserContext';
import VerMetrica from './components/pages/kid/MetricaMemo';


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message/>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/criancas' element={<Criancas />} />
            <Route path='/perfil' element={<Profile />} />
            <Route path='/kid/cad' element={<AddCrianca />} />
            <Route path='/kid/edit/:id' element={<EditKid />} />
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='/jogo-da-memoria' element={<JogoDaMemoria />} />
            <Route path='/:kidId' element={<VerMetrica />} />
          </Routes>
        <Footer />
      </UserProvider>  
    </Router>
  );
}

export default App;
