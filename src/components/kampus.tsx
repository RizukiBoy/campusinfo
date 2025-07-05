import React, { useState } from "react";
import { FiSearch, FiMapPin, FiMail, FiMenu, FiX, FiGlobe } from "react-icons/fi";

export default function kampus() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8 lg:px-16 relative">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black" />
          <h1 className="text-lg md:text-xl font-medium">Hi, Username</h1>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Hamburger Menu */}
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

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-gray-200 p-3 rounded-xl mb-6">
        <FiSearch className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Cari kampus impianmu"
          className="bg-transparent focus:outline-none w-full text-sm md:text-base"
        />
      </div>

      {/* Detail Kampus */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4" />
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
          <h2 className="font-semibold text-sm md:text-base">
            Universitas Muhammadiyah Magelang
          </h2>
          <div className="flex items-center gap-1 text-gray-700">
            <FiMapPin />
            <span>Magelang, Jawa tengah</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm mt-2 gap-2">
          <div className="flex items-center gap-1 text-gray-700">
            <FiMail />
            <span>unimma.ac.id</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <FiGlobe />
            <span>unimma.ac.id</span>
          </div>
        </div>
        <p className="text-sm text-gray-800 mt-4 leading-relaxed">
          Pernah membayangkan kuliah di tempat yang melahirkan para inovator hebat, teknokrat handal, dan pemimpin masa depan? Yup, itu ITB! Berdiri megah di Kota Bandung sejak 2 Maret 1959, Institut Teknologi Bandung (ITB) adalah kampus impian buat kamu yang punya semangat tinggi untuk menciptakan perubahan lewat teknologi, seni, dan sains.<br /><br />
          Di ITB, kamu bakal menemukan berbagai program studi keren yang siap mengasah bakat dan minatmu, seperti:
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Teknik Mesin & Dirgantara (FTMD) – Buat kamu yang tertarik dengan teknologi penerbangan dan mesin canggih.</li>
            <li>Teknik Elektro & Informatika (STEI) – Tempatnya para coder, hacker, dan future tech leader!</li>
            <li>Teknik Sipil & Lingkungan (FTSL) – Yuk, bangun infrastruktur keren dan lingkungan yang lebih baik.</li>
            <li>Sekolah Bisnis & Manajemen (SBM) – Belajar jadi entrepreneur sukses? Di sini tempatnya!</li>
          </ul>
          Bukan cuma belajar teori, di ITB kamu juga bisa ikutan berbagai project keren, riset teknologi, sampai organisasi yang bikin kamu makin berkembang. Fasilitas? Nggak usah ditanya! Di ITB punya laboratorium canggih, perpustakaan lengkap, dan pusat inovasi yang bikin kamu betah belajar dan eksplorasi ide-ide baru.<br /><br />
          Ditambah lagi, atmosfer kampus yang dinamis dan suasana...
        </p>
      </div>
    </div>
  );
}
