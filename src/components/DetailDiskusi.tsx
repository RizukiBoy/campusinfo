const DetailDiskusi = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Search bar */}
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Cari kampus impianmu"
          className="w-full px-4 py-2 rounded-xl bg-gray-200 text-sm outline-none"
        />
      </div>

      {/* Kategori */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow max-w-xl mx-auto">
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

      {/* Diskusi */}
      <div className="mt-6 max-w-xl mx-auto bg-white p-4 rounded-xl shadow text-left">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          Topik yang dibahas
        </h3>

        {/* Progress */}
        <div className="text-xs text-gray-500">95/100</div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden my-1 mb-3">
          <div className="w-[95%] h-full bg-gray-800" />
        </div>

        {/* Isi */}
        <p className="text-sm text-gray-700 leading-relaxed">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>

        {/* Komentar */}
        <h4 className="font-semibold text-sm text-black mt-6 mb-2">Komentar</h4>

        <div className="bg-gray-100 p-3 rounded-xl text-sm flex flex-col gap-1 shadow">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs">12:00 PM</span>
            <span className="font-semibold">Headline</span>
          </div>
          <p className="text-gray-600">
            Please add your content here. Keep it short and simple. And smile :)
          </p>
          <div className="flex justify-end mt-1">
            <button className="text-xs text-gray-600 hover:text-black flex items-center gap-1">
              <span>👍</span> <span>1</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailDiskusi;
