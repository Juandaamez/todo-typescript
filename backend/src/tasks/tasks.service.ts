import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = [];

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description, dueDate } = createTaskDto;
    const task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: 'PENDING',
    };
    this.tasks.push(task);
    return task;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.getTaskById(id);
    Object.assign(task, updateTaskDto);
    return task;
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return { message: 'Task deleted successfully' };
  }
}
