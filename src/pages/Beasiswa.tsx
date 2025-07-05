import CardBeasiswa from "../components/CardBeasiswa";


const Beasiswa = () => {
  return (
    <>

   <CardBeasiswa />

   <section>
        <div className="mt-4 shadow-md p-4 rounded-lg">
            <p className="text-red-500 bg-red-200 w-fit p-2 rounded-lg">Informasi Penting </p>
        </div>

        {/* Deskripsi */}
        <div className="mt-6 bg-white shadow-md rounded-xl p-4 text-sm text-gray-700">
          <p>
            Deskripsi beasiswa akan ada disini. Jelaskan informasi beasiswa,
            persyaratan, alur pendaftaran, dan informasi penting lainnya secara
            jelas dan padat.
          </p>
        </div>
   </section>
    </>
  );
};

export default Beasiswa;
