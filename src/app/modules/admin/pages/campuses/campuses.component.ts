import { Component } from '@angular/core';
import { ICampusRes } from 'src/app/core/models/campus.model';
import { CampusService } from 'src/app/core/services/campus.service';

@Component({
  selector: 'app-campuses-page',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css'],
})
export class CampusesComponent {
  campuses: ICampusRes[];
  isRegistering: boolean = false;
  modal: boolean = false;
  modalData!: ICampusRes;

  constructor(private readonly campusService: CampusService) {
    this.campuses = this.campusService.getAll();

    if (this.campuses) {
      this.modalData = this.campuses[0];
    }
  }

  setIsRegistering() {
    this.isRegistering = !this.isRegistering;
  }

  openModal(campus: ICampusRes) {
    this.modal = true;
    this.modalData = campus;
  }

  closeModal() {
    this.modal = false;
  }
}
