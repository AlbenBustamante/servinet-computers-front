import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  platforms: IPlatformRes[] = [];
  campuses: ICampusRes[] = [];
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
  platformsForm!: FormGroup;

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
      .getCampuses()
      .subscribe((res) => (this.campuses = res.data.results));

    this.platformsForm = this.fb.group({
      platforms: this.fb.array([]),
    });

    this.platformService.getAll().subscribe((res) => {
      this.platforms = res.data.results;
    });
  }

  platformChangeHandle(event: any) {
    if (event.target.checked) {
      this.platformsArray.push(new FormControl(event.target.value));
    } else {
      const index = this.platformsArray.controls.findIndex(
        (platform) => platform === event.target.value
      );

      this.platformsArray.removeAt(index);
    }
  }

  updatePlatforms() {
    this.campusService
      .updatePlatforms(this.campusData.id, this.platformsArray.value)
      .subscribe(() => this.setIsShowingInfo(undefined));
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
            .getCampuses()
            .subscribe((res) => (this.campuses = res.data.results));

          this.form.reset();
          this.setIsRegistering();
        }
      });
    }
  }

  get platformsArray() {
    return this.platformsForm.get('platforms') as FormArray;
  }
}
