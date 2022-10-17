import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/models/student.model';
import { HttpService } from '../shared/services/http.service';
import { DataComunicationService } from '../shared/services/data-comunication.service';

@Component({
  selector: 'app-students-list-render',
  templateUrl: './students-list-render.component.html',
  styleUrls: ['./students-list-render.component.css'],
})
export class StudentsListRenderComponent implements OnInit {
  studentsList: Student[] = [];
  showModal: boolean = false;
  constructor(
    private httpClient: HttpService,
    private dataComunication: DataComunicationService
  ) {}

  //ამ ფუნქციით ჩატვირთვისთანავე ვაკითხებ თუ რამე არის
  //json ში და მომაქვს,გამოძახებით ვიძახებ ngOnInit ში.
  readStudentList() {
    this.httpClient.get().subscribe((res: Student[]) => {
      if (res) {
        this.studentsList = res;
      }
    });
  }

  // dataComunication ის სერვისში მაქვს addStudentItemEmitter ემიტერი,
  //რომელიც აღიძრება  save ბათონზე დაკლიკვის შემდეგ,ეს ემიტერი სროულობს
  //item რომელიც არის templateDriven ფორმით შევსებული NgForm ის ობიექტი

  addStudentItemInStudentList() {
    this.dataComunication.addStudentItemEmitter.subscribe((res: Student) => {
      this.studentsList.push(res);
    });
  }

  ngOnInit(): void {
    this.readStudentList();
    this.addStudentItemInStudentList();
  }

  onDeleteItem(item: Student) {
    //წავშალე
    this.httpClient.delete(item.id).subscribe();
    //წაშლის ფუნქციაში ფაიფით შუაში,ხო ვისვრი deleteEmitter -ს
    //ჰოდა აგერ მაგის საბსქრაიბზე რენდერის ფუნქციას ვაკეთებ
    //ანუ რო წავშალე მერე თავიდან დავარენდერე
    this.dataComunication.deleteEmitter.subscribe(() => {
      this.readStudentList();
    });
  }
  onModalShowHide(item: Student) {
    this.showModal = true;
    this.dataComunication.showModalEmitter.emit(this.showModal);

    //ეს updateStudentEmitter თ გავიქნიე ის item რომლის
    //update ზეც დაეკლიკა,და ამას გამოვიყენებ update ის დასაბმიტების
    //დროს, ანუ updateStudentEmitter ის საბსქრაიბში ყოველთვის
    //ის studentItem მექნება რომელის update ზეც დაეკლიკება
    //და შესაბამისად ამოვა მოდალიც.
    this.dataComunication.updateStudentEmitter.emit(item);
  }
}
