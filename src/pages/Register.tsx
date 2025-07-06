import { useState, } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../lib/supabaseClient';


const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', moto_hidup:''});
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const {username, password, moto_hidup} = form;   
    // Proses registrasi di sini
    console.log(form);

    const { data: existingUser } = await supabase
      .from('profile')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      alert('Username sudah digunakan!');
      return;
    }

     const { error } = await supabase.from('profile').insert([
      {
        username,
        password, // ⚠️ Hanya untuk demo! Tidak aman!
        moto_hidup,
        role: 'user',
      },
    ]);

    if (error) {
      alert('Gagal daftar: ' + error.message);
      return;
    }

    alert('Registrasi berhasil!');
    navigate('/login');


  // 2. Tambahkan ke tab; // redirect ke halaman login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Daftar</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nama Lengkap"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="moto_hidup"
            placeholder="Moto hidup"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Daftar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
