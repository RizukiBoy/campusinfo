import { Routes, Route } from'react-router'
import Home from './pages/Home';
import './App.css'
import Campus from './pages/Campus';
import Layout from './pages/Layout'
import JalurPendaftaran from './pages/JalurPendaftaran';
import Beasiswa from './pages/Beasiswa';
import ForumDiskusi from './pages/ForumDiskusi';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
       <>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/jalur-pendaftaran" element={<JalurPendaftaran />} />
          <Route path="/beasiswa" element={<Beasiswa />} />
          <Route path="/forum" element={<ForumDiskusi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </Layout>
       </>
   
  )
}

export default App
