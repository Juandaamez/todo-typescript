import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a la App de Tareas</h1>
      {isAuthenticated ? (
        <>
          <p className="mb-4 text-lg">Estás autenticado.</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors mb-4"
          >
            Cerrar Sesión
          </button>
          <Link href="/tasks" className="text-blue-200 hover:underline">
            Ir a Mis Tareas
          </Link>
        </>
      ) : (
        <>
          <p className="mb-4 text-lg">Inicia sesión o regístrate para acceder a tus tareas.</p>
          <div className="flex space-x-4">
            <Link href="/auth/login" className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition-colors">
              Iniciar Sesión
            </Link>
            <Link href="/auth/register" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
              Registrarse
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
