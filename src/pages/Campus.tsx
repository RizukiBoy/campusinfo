import React, { useState } from "react";
import { FiSearch, FiMapPin, FiMail, FiMenu, FiX, FiGlobe } from "react-icons/fi";

export default function Campus() {
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

      {/* Detail Kampus */}
<div className="bg-white rounded-xl shadow-md p-6 mb-8 text-gray-800">
  <p className="text-base leading-relaxed">
    <span className="font-semibold block mb-2">
      Pernah membayangkan kuliah di tempat yang melahirkan para inovator hebat, teknokrat handal, dan pemimpin masa depan?
    </span>
    Yup, itu <span className="font-bold text-blue-700">ITB</span>! Berdiri megah di Kota Bandung sejak 2 Maret 1959, Institut Teknologi Bandung (ITB) adalah kampus impian buat kamu yang punya semangat tinggi untuk menciptakan perubahan lewat teknologi, seni, dan sains.
  </p>

  <div className="mt-4">
    <h3 className="font-semibold text-lg mb-2 text-gray-900">Program Studi Unggulan:</h3>
    <ul className="list-type-none space-y-2 text-sm md:text-base">
      <li>
        <span className="font-medium">Teknik Mesin & Dirgantara (FTMD):</span> Buat kamu yang tertarik dengan teknologi penerbangan dan mesin canggih.
      </li>
      <li>
        <span className="font-medium">Teknik Elektro & Informatika (STEI):</span> Tempatnya para coder, hacker, dan future tech leader!
      </li>
      <li>
        <span className="font-medium">Teknik Sipil & Lingkungan (FTSL):</span> Yuk, bangun infrastruktur keren dan lingkungan yang lebih baik.
      </li>
      <li>
        <span className="font-medium">Sekolah Bisnis & Manajemen (SBM):</span> Belajar jadi entrepreneur sukses? Di sini tempatnya!
      </li>
    </ul>
  </div>

  <p className="mt-6 text-base leading-relaxed">
    Bukan cuma belajar teori, di ITB kamu juga bisa ikutan berbagai project keren, riset teknologi, sampai organisasi yang bikin kamu makin berkembang. 
    <br className="hidden md:block" />
    Fasilitas? Nggak usah ditanya! Di ITB punya laboratorium canggih, perpustakaan lengkap, dan pusat inovasi yang bikin kamu betah belajar dan eksplorasi ide-ide baru.
  </p>

  <p className="mt-4 text-base leading-relaxed italic text-gray-600">
    Ditambah lagi, atmosfer kampus yang dinamis dan suasana...
  </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>Fakultas (kampus 1)</h2>

          <ul>
            <li>Fakultas A</li>
            <li>Fakultas A</li>
            <li>Fakultas A</li>
            <li>Fakultas A</li>
            <li>Fakultas A</li>

          </ul>
        </div>
        <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>Fakultas (kampus 1)</h2>

          <ul>
            <li>Fakultas A</li>
            <li>Fakultas A</li>
            <li>Fakultas A</li>
            <li>Fakultas A</li>
            <li>Fakultas A</li>

          </ul>
        </div>
</div>

                <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>Pembayaran UKT</h2>
        </div>


  <div className="w-full mx-auto md:w-1/2 mt-6 flex flex-col gap-3">
        <div className="h-6 bg-gray-300 rounded w-3/5 self-start"></div>
        <div className="h-6 bg-gray-300 rounded w-3/5 self-end"></div>
        <div className="h-6 bg-gray-300 rounded w-3/5 self-start"></div>
        <div className="h-6 bg-gray-300 rounded w-3/5 self-end"></div>
      </div>
  </>
  );
}


