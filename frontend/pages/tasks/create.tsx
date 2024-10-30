import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleCreateTask = async () => {
    try {
      const response = await api.post('/tasks', { title, description });
      console.log('Tarea creada:', response.data);
      router.push('/tasks'); // Redirige a la lista de tareas después de crear
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Tarea</h1>
      <div className="w-full max-w-sm bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 px-3 py-2 border rounded w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 px-3 py-2 border rounded w-full"
          />
        </div>
        <button
          onClick={handleCreateTask}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Crear Tarea
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
