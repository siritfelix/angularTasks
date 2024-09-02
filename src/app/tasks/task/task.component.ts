import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  @Input() task: Task = this.initTask()
  @Input() i: number = 0
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Task>();
  edit: boolean = false
  selectedValue: 'baja' | 'media' | 'alta' = 'baja';
  options: ('baja' | 'media' | 'alta')[] = ['baja', 'media', 'alta'];
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.selectedValue = this.task.prioridad
    this.edit = false

  }
  
  initTask(): Task {
    return {
      id: 0,
      titulo: '',
      descripcion: '',
      completada: false,
      prioridad: 'media',
    };
  }
  onDelete(id: number): void {
    this.delete.emit(id)
  }

  onEdit() {
    this.edit = true;
  }
  onCancel() {
    this.edit = false;
  }
  onModify(task: Task) {
    this.update.emit(task)
    this.edit = false
  }
}