import Timeline from "../components/timeline"

const JalurPendaftaran = () => {
    return (
        <>
        <div className="grid grid-cols-2 gap-4 my-20">

        <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>SNBP</h2>
        </div>
        <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>SNBT</h2>

        </div>
                <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>Ujian mandiri</h2>


        </div>
                <div className="w-full h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg mb-4">
          <h2>Beasiswa</h2>
        </div>

        </div>
        <Timeline />
        </>

    )
}

export default JalurPendaftaran