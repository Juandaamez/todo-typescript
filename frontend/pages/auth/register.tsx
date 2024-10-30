import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';

type RegisterFormData = {
  username: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post('/auth/register', data);
      if (response.status === 201) {
        router.push('/auth/login'); // Redirige al login después de registrarse
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Registrarse</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            {...register('username', { required: 'Este campo es obligatorio' })}
            className="mt-1 px-3 py-2 border rounded w-full"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            {...register('password', { required: 'Este campo es obligatorio' })}
            className="mt-1 px-3 py-2 border rounded w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
