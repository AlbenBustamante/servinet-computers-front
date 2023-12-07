import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICampusRes } from 'src/app/core/models/campus.model';
import { CampusService } from 'src/app/core/services/campus.service';
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
  modalData: ICampusRes = {
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
  form: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly campusService: CampusService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      numeral: [Validators.required],
      cellphone: [, Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });

    this.userService
      .getCampuses(3) // temporal
      .subscribe((res) => (this.campuses = res.data.results));
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

  onSubmit() {
    if (this.form.valid) {
      this.campusService.register(this.form.value).subscribe((res) => {
        if (res.ok) {
          this.userService
            .getCampuses(3)
            .subscribe((res) => (this.campuses = res.data.results));

          this.form.reset();
          this.setIsRegistering();
        }
      });
    }
  }
}
