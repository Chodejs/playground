import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

// Import our new pages
import Home from './pages/Home';
import Docs from './pages/Docs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />
      {/* The Main wrapper handles the layout constraints */}
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </div>
  )
}

export default App;