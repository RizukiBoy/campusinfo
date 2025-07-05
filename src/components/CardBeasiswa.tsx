 const beasiswaList = [
  {
    id: 1,
    nama: 'Beasiswa KIP Kuliah',
    timeline: 'Pendaftaran: Jan - Mar 2025',
  },
  {
    id: 2,
    nama: 'Beasiswa LPDP',
    timeline: 'Pendaftaran: Apr - Mei 2025',
  },
  {
    id: 3,
    nama: 'Beasiswa Bank Indonesia',
    timeline: 'Pendaftaran: Feb - Apr 2025',
  },
  {
    id: 4,
    nama: 'Beasiswa Unggulan Kemendikbud',
    timeline: 'Pendaftaran: Mar - Mei 2025',
  },
];
 
 const CardBeasiswa = () => {
    return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Daftar Beasiswa Tersedia
      </h2>

      {/* Beasiswa Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto">
        {beasiswaList.map((beasiswa) => (
          <div
            key={beasiswa.id}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition"
          >

            <div className="w-full h-60 rounded-lg">
            <img src="dadnadkjas.jpg"/>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {beasiswa.nama}
            </h3>

            <p className="text-sm text-gray-600">{beasiswa.timeline}</p>
          </div>
        ))}
      </div>
    </section>
    )
 }   

 export default CardBeasiswa
    
