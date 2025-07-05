import React, {useState} from 'react';
import { Link } from 'react-router';
import Header from "../components/Header"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
       const [menuOpen, setMenuOpen] = useState(false);
    
  return (
<div className="min-h-screen px-4 py-6 md:px-8 lg:px-16 max-w-screen-xl flex flex-col">
       <Header />



    <div className="flex-grow p-4">
            <main>{children}</main>
    </div>


                
    <footer className="bg-white border-t mt-12 p-6 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h4 className="font-semibold text-gray-800">Kampus Info</h4>
          <p className="text-gray-500 mt-1">
            Temukan informasi kampus, beasiswa, dan forum diskusi mahasiswa.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-800">Navigasi</span>
          <Link to="/" className="hover:text-blue-600">Beranda</Link>
          <Link to="/beasiswa" className="hover:text-blue-600">Beasiswa</Link>
          <Link to="/forum" className="hover:text-blue-600">Forum Diskusi</Link>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-800">Kontak</span>
          <a href="mailto:info@kampusinfo.id" className="hover:text-blue-600">info@kampusinfo.id</a>
          <span>© {new Date().getFullYear()} Kampus Info</span>
        </div>
      </div>
    </footer>
</div>
  );
};

export default Layout;

