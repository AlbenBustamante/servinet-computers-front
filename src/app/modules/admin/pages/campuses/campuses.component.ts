import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICampusRes } from 'src/app/core/models/campus.model';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { CampusService } from 'src/app/core/services/campus.service';
import { PlatformService } from 'src/app/core/services/platform.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-campuses-page',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css'],
})
export class CampusesComponent {
  campuses: ICampusRes[] = [];
  platforms: IPlatformRes[] = [];
  isRegistering: boolean = false;
  isShowingInfo: boolean = false;
  headerTitle: string = 'Sedes registradas';
  campusData: ICampusRes = {
    address: '',
    available: false,
    cellphone: '',
    createdAt: '',
    id: 0,
    numeral: -1,
    platforms: [],
    terminal: '0',
    updatedAt: '',
  };
  form: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly campusService: CampusService,
    private readonly platformService: PlatformService,
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

    this.platformService
      .getAll()
      .subscribe((res) => (this.platforms = res.data.results));
  }

  setIsRegistering() {
    if (this.isShowingInfo) {
      this.isShowingInfo = false;
    }

    this.isRegistering = !this.isRegistering;
    this.headerTitle = this.isRegistering
      ? 'Registro de nueva sede'
      : 'Sedes registradas';
  }

  setIsShowingInfo(campus: ICampusRes | undefined) {
    if (this.isRegistering) {
      this.isRegistering = false;
    }

    this.isShowingInfo = !this.isShowingInfo;

    this.headerTitle = this.isShowingInfo
      ? `Información de la Sede #${campus?.numeral}`
      : 'Sedes registradas';

    if (campus !== undefined) {
      this.campusData = campus;
    }
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
