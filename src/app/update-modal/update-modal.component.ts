import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/models/student.model';
import { DataComunicationService } from '../shared/services/data-comunication.service';
import { NgForm } from '@angular/forms';
import { HttpService } from '../shared/services/http.service';
@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent implements OnInit {
  showOrHideModal: boolean = false;
  updateStudent = new Student();
  constructor(
    private dataComunication: DataComunicationService,
    private httpClient: HttpService
  ) {}

  ngOnInit(): void {
    this.dataComunication.showModalEmitter.subscribe((res) => {
      this.showOrHideModal = res;
    });

    this.dataComunication.updateStudentEmitter.subscribe((res) => {
      this.updateStudent = res;
    });
  }
  onCloseModal() {
    this.showOrHideModal = false;
  }
  ngFormSubmit(item: NgForm) {
    //აი სად დამჭირდა updateStudentEmitter მოტანილი
    //studentItem რომლის update ზეც დაეკლიკა
    //აქ იდიაში item -იც მაქვს რომელსაც როგორც ხედავთ
    //არაფერში ვიყენებ რადგან ის არის ngFrom ის ობიექტი
    //და მას id არ აქვს,რადგან ჩვენს შემთხვევაში json ის მხარეს ხდება
    //მინიჭება id-ის. მე კი id იანი ობიექტი მჭირდება,რო შესაბამის
    //აითემზე მოხდეს აბდეითი,და ლინკში ეს id გავაყოლო.
    //updateStudent კი სტუდენტის ტიპის ობიექტია და მას აქვს id.
    this.httpClient.update(this.updateStudent).subscribe((res) => {
      if (res) {
        this.onCloseModal();
      }
    });
  }
}
