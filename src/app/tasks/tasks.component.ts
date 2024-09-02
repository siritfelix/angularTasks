import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../_services/task.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  addTaskForm: boolean = false
  tasks: Task[] = []
  content?: string;
  prioridad: 'sin filtro' | 'baja' | 'media' | 'alta' = 'sin filtro';
  prioridadOption: ('sin filtro' | 'baja' | 'media' | 'alta')[] = ['sin filtro', 'baja', 'media', 'alta'];

  completadadOption: ('sin filtro' | 'false' | 'true')[] = ['sin filtro', 'false', 'true'];
  completada: 'sin filtro' | 'false' | 'true' = 'sin filtro';

  private taskService = inject(TaskService);
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    if (this.prioridad != 'sin filtro' || this.completada != 'sin filtro') {
      this.upDateFiler()
    } else {
      this.taskService.getAllTasks().subscribe(
        {
          next: data => {
            this.tasks = data;
          },
          error: err => {
            if (err.status == '403') {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    }
  }

  onUpdate(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: data => {
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    })
    this.getAllTasks()
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: data => {
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    })
    this.getAllTasks()
  }
  onCreate(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: data => {
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    })
    this.getAllTasks()
  }


  getAllTasksByFilter(prioridad?: String | null, completada?: Boolean | null) {
    this.taskService.getAllTasksByFilter(prioridad, completada).subscribe(
      {
        next: data => {
          this.tasks = data;
        },
        error: err => {
          if (err.error) {
            try {
              const res = JSON.parse(err.error);
              this.content = res.message;
            } catch {
              this.content = `Error with status: ${err.status} - ${err.statusText}`;
            }
          } else {
            this.content = `Error with status: ${err.status}`;
          }
        }
      }
    );

  }

  upDateFiler() {
    if (this.prioridad != 'sin filtro' || this.completada != 'sin filtro') {
      if (this.prioridad == 'sin filtro')
        this.getAllTasksByFilter(null, this.completada == 'true' ? true : false)
      else if (this.completada == 'sin filtro')
        this.getAllTasksByFilter(this.prioridad, null)
      else
        this.getAllTasksByFilter(this.prioridad, this.completada == 'true' ? true : false)
    } else {
      this.getAllTasks()
    }
  }
}