import { useState } from "react";
import { FiSearch, FiMapPin, FiMail, FiMenu, FiX } from "react-icons/fi";

const Header = () => {
        const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black" />
            <h1 className="text-lg md:text-xl font-medium">Hi, Username</h1>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
  
        {menuOpen && (
          <div className="absolute top-20 right-4 bg-white shadow-md rounded-lg p-4 w-48 z-10">
            <button className="block w-full text-left text-gray-700 py-2 hover:bg-gray-100 rounded">
              Beasiswa
            </button>
            <button className="block w-full text-left text-gray-700 py-2 hover:bg-gray-100 rounded">
              Forum Diskusi
            </button>
          </div>
        )}
        </>
)

}

export default Header;