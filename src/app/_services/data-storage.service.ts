import { Injectable } from '@angular/core';
import { Task } from '../tasks/task/task.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private tasks: Task[] = []

  constructor() {
    this.loadTask()
  }


  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    if (task.id == null)
      task.id = this.tasks.length + 1
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  loadTask() {
    this.tasks = [
      {
        id: 1,
        titulo: 'Comprar alimentos',
        descripcion: 'Comprar frutas, verduras y otros alimentos esenciales.',
        completada: false,
        prioridad: 'baja',
        etiquetas: 'hogar,urgente',
        asignadaA: 'Juan Pérez'
      },
      {
        id: 2,
        titulo: 'Preparar presentación',
        descripcion: 'Finalizar y practicar la presentación para la reunión de la próxima semana.',
        completada: true,
        prioridad: 'media',
        etiquetas: 'trabajo',
        asignadaA: 'Ana Gómez'
      },
      {
        id: 3,
        titulo: 'Hacer compras',
        descripcion: 'Finalizar y practicar la presentación para la reunión de la próxima semana.',
        completada: true,
        prioridad: 'alta',
        etiquetas: 'trabajo',
        asignadaA: 'Ana Gómez'
      }
    ];
  }
}
