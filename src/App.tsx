import { Routes, Route } from'react-router'
import Home from './pages/Home';
import './App.css'
import Campus from './pages/Campus';
import Layout from './pages/Layout'
import JalurPendaftaran from './pages/JalurPendaftaran';
import Beasiswa from './pages/Beasiswa';
import ForumDiskusi from './pages/ForumDiskusi';

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
        </Routes>
        </Layout>
       </>
   
  )
}

export default App
