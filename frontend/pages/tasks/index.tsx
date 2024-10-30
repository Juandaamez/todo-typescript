import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';

type Task = {
  id: string;
  title: string;
  description: string;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      const data: Task[] = response.data;
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.warn("La respuesta de tareas no es un array.");
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    router.push('/'); // Redirige al índice principal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Mis Tareas</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded p-6">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between border-b border-gray-200 py-2">
                <div>
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => router.push(`/tasks/edit?id=${task.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No tienes tareas registradas.</p>
        )}
        <button
          onClick={() => router.push('/tasks/create')}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Crear Nueva Tarea
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default TaskList;
