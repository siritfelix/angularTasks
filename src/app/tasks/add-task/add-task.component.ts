import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { TaskService } from '../../_services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  tareaForm: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    completada: new FormControl(false),
    prioridad: new FormControl(''),
    descripcion: new FormControl(''),
    etiquetas: new FormControl(''),
    asignadaA: new FormControl('')
  })
  private taskService = inject(TaskService);
  isLoggedIn = false;
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService) { }
  getForm(): { [key: string]: AbstractControl } {
    return this.tareaForm.controls
  }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn)
      this.router.navigate(['/home'])
    this.tareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      completada: [false, Validators.required],
      prioridad: ['media', Validators.required],
      descripcion: ['', Validators.maxLength(500)],
      etiquetas: [''],
      asignadaA: ['']
    });
  }

  get etiquetas() {
    return this.tareaForm.get('etiquetas') as FormArray;
  }

  agregarEtiqueta(etiqueta: string): void {
    if (etiqueta) {
      this.etiquetas.push(this.fb.control(etiqueta));
    }
  }

  eliminarEtiqueta(index: number): void {
    this.etiquetas.removeAt(index);
  }

  onSubmit(): void {
    if (this.tareaForm.valid) {
      const nuevaTarea = this.tareaForm.value;
      this.taskService.addTask(nuevaTarea).subscribe({
        next: data => { this.router.navigate(['/tasks']) },
        error: err => {
          if (err.error) {
            try {
              const res = JSON.parse(err.error);
            } catch {
            }
          } else {
          }
        }
      })

    } else {
      this.router.navigate(['/home'])
      console.log('Formulario inválido');
    }
  }
}
