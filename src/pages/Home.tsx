import {useState} from 'react';
import { FiSearch, FiMapPin, FiMail, FiMenu, FiX } from "react-icons/fi";
import {FaGlobe } from "react-icons/fa"
import CardCampus from '../components/CardCampus';
const Home = () => {
  const [count, setCount] = useState(0)
   const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-gray-200 p-3 rounded-xl mb-6">
        <FiSearch className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Cari kampus impianmu"
          className="bg-transparent focus:outline-none w-full text-sm md:text-base"
        />
      </div>

      {/* Kartu Kampus */}
      <CardCampus />

      {/* Section Title */}
      <h3 className="font-semibold text-md md:text-lg mb-4">Kampus pilihan</h3>

      {/* daftar kampus pilihan */}
      <CardCampus />
    </>
  )
}
 export default Home