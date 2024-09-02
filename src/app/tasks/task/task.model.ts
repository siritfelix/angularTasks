export class Task {
    constructor(
        public id: number,
        public titulo: string,
        public completada: boolean,
        public prioridad: 'baja' | 'media' | 'alta',
        public descripcion?: string,
        public etiquetas?: string,
        public asignadaA?: string) { }
}