import { Injectable, EventEmitter } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class DataComunicationService {
  addStudentItemEmitter = new EventEmitter<Student>();
  deleteEmitter = new EventEmitter<void>();
  showModalEmitter = new EventEmitter<boolean>();
  updateStudentEmitter = new EventEmitter<Student>();

  constructor() {}
}
