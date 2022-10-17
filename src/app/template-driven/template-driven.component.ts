import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../shared/models/student.model';
import { HttpService } from '../shared/services/http.service';
import { DataComunicationService } from '../shared/services/data-comunication.service';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css'],
})
export class TemplateDrivenComponent implements OnInit {
  constructor(
    private httpClient: HttpService,
    private dataComunication: DataComunicationService
  ) {}

  ngOnInit(): void {}

  onSubmit(item: NgForm) {
    this.httpClient.post(item).subscribe((res: Student) => {
      this.dataComunication.addStudentItemEmitter.emit(res);
    });
    item.reset();
  }
}
