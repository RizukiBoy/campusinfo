import DetailDiskusi from "../components/DetailDiskusi";

const ForumDiskusi = () => {
  return (

    <>
    <section className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Search */}

      {/* Kategori */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-md">
        <h4 className="font-medium text-gray-700 mb-2">Kategori</h4>
        <div className="flex flex-wrap gap-2">
          {['Kategori', 'Kategori', 'Kategori', 'Kategori'].map((item, i) => (
            <button
              key={i}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Postingan Diskusi */}
<div className="mt-6 flex flex-col gap-4">
  {[1, 2, 3, 4].map((item) => (
    <div key={item} className="bg-white p-4 rounded-xl shadow text-left">
      <h3 className="text-left font-semibold text-gray-800">
        {item === 1 ? 'Topik yang dibahas' : 'Headline'}
      </h3>

      {/* Progress */}
      <div className="mt-1 text-xs text-gray-500 text-left">95/100</div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1 mb-2">
        <div className="w-[95%] h-full bg-gray-800" />
      </div>

      {/* Isi singkat */}
      <p className="text-left text-sm text-gray-600">
        Please add your content here. Keep it short and simple. And smile :)
      </p>
    </div>
  ))}
</div>

    </section>

    <DetailDiskusi />
    
    </>
  );
};

export default ForumDiskusi;
