import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.css']
})
export class AddSubjectModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

 //  open(content) {
 //   this.modalService.open(content).result.then((result) => {
 //     this.closeResult = `Closed with: ${result}`;
 //   }, (reason) => {
 //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 //   });
 // }

 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }

}
