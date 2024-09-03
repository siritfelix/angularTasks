import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../_services/task.service';
import { EventBusService } from '../_shared/event-bus.service';
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
  eventBusSub?: Subscription;
  private taskService = inject(TaskService);
  constructor(private router: Router, private eventBusService: EventBusService) { }
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
            this.router.navigate(['/home'])
          }
        }
      );

    }
  }

  onUpdate(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: data => {
        this.getAllTasks()
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
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: data => {
        this.getAllTasks()
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
  }
  onCreate(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: data => {
        this.getAllTasks()
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
  }


  getAllTasksByFilter(prioridad?: String | null, completada?: Boolean | null) {
    this.taskService.getAllTasksByFilter(prioridad, completada).subscribe(
      {
        next: data => {
          this.tasks = data;
          this.getAllTasks()
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