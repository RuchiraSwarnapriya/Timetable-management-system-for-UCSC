import { Injectable } from '@angular/core';
import { Lecturer } from './lecturer.model';  // Lecturer data type interface class
// tslint:disable-next-line:max-line-length
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';  // Firebase modules for Database, Data list and Single object
import {FormControl, FormGroup, Validators} from '@angular/forms';
  import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class LecturerService {
    formData : Lecturer;

constructor(private firestore: AngularFirestore) {}
    // tslint:disable-next-line:member-ordering
    lecturerList: AngularFireList<any>;
  // tslint:disable-next-line:member-ordering
  form = new FormGroup({
    $key: new FormControl(null),
    userName: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.email),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')])
  });


getLecturers(){
  return this.firestore.collection('lecturers').snapshotChanges();
}





//   getLecturers() {
//     this.lecturerList = this.firebase.list('lecturers');
//     return this.lecturerList.snapshotChanges();
//   }

//   insertLecturer(lecturer) {
//     this.lecturerList.push({
//       userName: lecturer.userName,
//       firstName: lecturer.firstName,
//       lastName: lecturer.lastName,
//       email: lecturer.email,
//       mobileNumber: lecturer.mobileNumber
//     });
//   }

//   populateForm(lecturer){
//     this.form.setValue(lecturer);
//   }

//   updateLecturer(lecturer) {
//     this.lecturerList.update(lecturer.$key,{
//       userName: lecturer.userName,
//       firstName: lecturer.firstName,
//       lastName: lecturer.lastName,
//       email: lecturer.email,
//       mobileNumber: lecturer.mobileNumber
//     });
//   }

//   deleteLecturer($key: string){
//     this.lecturerList.remove($key);
//   }
// }

}



