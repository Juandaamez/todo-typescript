import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import { Task } from '../../models/task';

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    status: '',
    dueDate: '',
    userId: '',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        console.log('Tarea obtenida:', response.data);
        setTask(response.data);
      } catch (error) {
        console.error('Error al obtener la tarea:', error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        title: task.title,
        description: task.description,
      });
      console.log('Tarea actualizada:', response.data);
      router.push('/tasks');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Editar Tarea</h1>
        
        <label className="block text-gray-700 font-medium mb-2">Título</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Título"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-700 font-medium mb-2">Descripción</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Descripción"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />

        <button
          onClick={handleUpdateTask}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default EditTask;
