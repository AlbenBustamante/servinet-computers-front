import { Component } from '@angular/core';
import { ICampusRes } from 'src/app/core/models/campus.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-campuses-page',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css'],
})
export class CampusesComponent {
  campuses: ICampusRes[] = [];
  isRegistering: boolean = false;
  modal: boolean = false;
  headerTitle: string = 'Sedes registradas';
  modalData: ICampusRes;

  constructor(private readonly userService: UserService) {
    this.userService
      .getCampuses(1)
      .subscribe((res) => (this.campuses = res.data.results));

    if (this.campuses.length > 0) {
      this.modalData = this.campuses[0];
    } else {
      this.modalData = {
        address: '',
        available: false,
        cellphone: '',
        createdAt: new Date(),
        id: 0,
        numeral: -1,
        platforms: [],
        terminal: '0',
        updatedAt: new Date(),
      };
    }
  }

  setIsRegistering() {
    this.isRegistering = !this.isRegistering;
    this.headerTitle = this.isRegistering
      ? 'Registro de nueva sede'
      : 'Sedes registradas';
  }

  openModal(campus: ICampusRes) {
    this.modal = true;
    this.modalData = campus;
  }

  closeModal() {
    this.modal = false;
  }
}
