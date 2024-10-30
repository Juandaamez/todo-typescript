export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate?: string; // Opcional si no siempre es necesario
  userId: string;
}
