import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../tasks/task/task.model';
import { DataStorageService } from './data-storage.service';

const API_URL = 'http://localhost:8080/tasks';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private dataMock: DataStorageService) {
    this.getAllTasks()
  }


  getAllTasks(): Observable<any> {
    //return of(this.dataMock.getAllTasks())
    return this.http.get<Task[]>(API_URL)
  }
  updateTask(task: Task): Observable<any> {
    //return of(this.dataMock.updateTask(task))
    return this.http.patch(API_URL + '/' + task.id, JSON.stringify(task))
  }

  deleteTask(id: number): Observable<any> {
    //return of(this.dataMock.deleteTask(id))
    return this.http.delete(API_URL + '/' + id)
  }

  addTask(task: Task): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(API_URL, JSON.stringify(task), { headers })
  }
  getAllTasksByFilter(prioridad?: String | null, completada?: Boolean | null): Observable<any> {
    var tasksFilter: Task[] = this.dataMock.getAllTasks()
    if (prioridad != null) {
      tasksFilter = tasksFilter.filter(task => task.prioridad == prioridad)
    }
    if (completada != null) {
      tasksFilter = tasksFilter.filter(task => task.completada == completada)
    }
    return of(tasksFilter)
  }
}
