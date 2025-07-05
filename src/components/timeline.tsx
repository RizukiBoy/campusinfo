
const snbpTimeline = [
  {
    id: 1,
    title: "Persyaratan Sekolah",
    description: [
      "SMA/MA/SMK yang mempunyai NPSN.",
      "Akreditasi sekolah (A, B, C, atau lainnya).",
      "Jumlah siswa eligible ditentukan oleh akreditasi.",
    ],
    date: "Sebelum pengumuman kuota",
    button: "Masuk",
  },
  {
    id: 2,
    title: "Persyaratan Siswa Pendaftar",
    description: [
      "Merupakan siswa kelas 12 SMA/MA/SMK sederajat pada tahun 2025.",
      "Memiliki prestasi akademik dan memenuhi syarat dari PTN.",
      "Memiliki NISN dan terdaftar di PDSS.",
    ],
    date: "Bersamaan kuota siswa",
    button: "Masuk",
  },
  {
    id: 3,
    title: "Pengisian Data PDSS",
    description: [
      "Sekolah login menggunakan akun SNPMB sekolah.",
      "Memasukkan data nilai siswa secara lengkap ke sistem PDSS.",
    ],
    date: "9 – 28 Januari 2025",
    image: "/img/pdss.png", // Optional
    button: "Masuk",
  },
  {
    id: 4,
    title: "Pendaftaran SNBP",
    description: [
      "Siswa login dan memilih program studi pilihan.",
      "Mengunggah portofolio (jika diminta).",
    ],
    date: "14 – 28 Februari 2025",
    button: "Masuk",
  },
  {
    id: 5,
    title: "Pengumuman Hasil SNBP",
    description: ["Hasil seleksi diumumkan secara online di portal resmi."],
    date: "26 Maret 2025",
    button: "Masuk",
  },
];

const Timeline = () => {
  return (
  <section className="bg-gray-100 py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
        Jadwal SNBP 2025
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* 🔹 Garis Vertikal: kiri di mobile, tengah di desktop */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-gray-300 left-5 lg:left-1/2 transform lg:-translate-x-1/2" />

        <div className="flex flex-col gap-16">
          {snbpTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col lg:flex-row ${
                  isLeft ? 'lg:items-start' : 'lg:items-end lg:flex-row-reverse'
                }`}
              >
                {/* 🔸 Icon Lingkaran */}
                <div className="absolute left-1 lg:left-1/2 transform lg:-translate-x-1/2">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                    {item.id}
                  </div>
                </div>

                {/* 🔹 Konten */}
                <div
                  className={`mt-10 ml-12 lg:ml-0 w-full lg:w-[48%] bg-white rounded-lg shadow p-6`}
                >
                  <h3 className="text-lg font-bold text-teal-700 mb-2">
                    {item.title}
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 mb-3 space-y-1">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  {item.image && (
                    <img
                      src={item.image}
                      alt="timeline"
                      className="w-full mt-3 rounded"
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                  <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    {item.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
