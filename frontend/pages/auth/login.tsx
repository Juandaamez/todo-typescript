// pages/auth/login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';
import axios from 'axios';


type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    console.log("Datos enviados:", data);
    try {
      const response = await api.post('/auth/login', data);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        console.log("Token guardado:", token);
        router.push('/tasks');
      } else {
        console.error('No se recibió un token en la respuesta');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error en la solicitud de login:', error.response || error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de Usuario</label>
          <input {...register('username')} type="text" className="mt-1 px-3 py-2 border rounded w-full" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Contraseña</label>
          <input {...register('password')} type="password" className="mt-1 px-3 py-2 border rounded w-full" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
