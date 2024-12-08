import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  createTask(task: Task): Task {
    const newTask = { ...task, id: Math.random().toString() };
    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const task = this.getTaskById(id);
    const updatedTask = { ...task, ...update };

    this.tasks = this.tasks.map((task) =>
      task.id === id ? updatedTask : task
    );

    return updatedTask;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const [deletedTask] = this.tasks.splice(taskIndex, 1);
    
    return deletedTask;
  }
}
