import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICampusRes } from '@models/campus.model';
import { IPlatformRes } from '@models/platform.model';
import { RequestStatus } from '@models/request-status.model';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';
import { CampusService } from '@services/campus.service';
import { PlatformService } from '@services/platform.service';
import { UserService } from '@services/user.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-campuses-page',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css'],
})
export class CampusesComponent implements OnInit {
  routes: IRoute[] = [
    { title: 'Admin', icon: 'home', route: '/admin' },
    { title: 'Sedes' },
  ];
  platforms: IPlatformRes[] = [];
  campuses: ICampusRes[] = [];
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
  newCampusModal!: HTMLDialogElement;
  form: FormGroup;
  platformsForm!: FormGroup;
  campusesAndPlatformsStatus: RequestStatus = 'loading';
  formStatus: RequestStatus = 'init';
  platformsFormStatus: RequestStatus = 'init';

  constructor(
    private readonly userService: UserService,
    private readonly campusService: CampusService,
    private readonly platformService: PlatformService,
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly validator: GeneralValidators
  ) {
    this.form = this.fb.group({
      numeral: [, Validators.required],
      cellphone: [, Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });

    this.userService.getCampuses().subscribe({
      next: (res) => {
        this.campuses = res.data.results;

        this.platformService.getAll().subscribe({
          next: (res) => {
            this.campusesAndPlatformsStatus = 'success';
            this.platforms = res.data.results;
          },
          error: (error) => {
            this.campusesAndPlatformsStatus = 'failed';
          },
        });
      },
      error: (error) => {
        this.campusesAndPlatformsStatus = 'failed';
      },
    });

    this.platformsForm = this.fb.group({
      platforms: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.authService.getUser()?.subscribe();
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
    this.platformsFormStatus = 'loading';

    this.campusService
      .updatePlatforms(this.campusData.id, this.platformsArray.value)
      .subscribe({
        next: () => {
          this.platformsFormStatus = 'success';
          this.setIsShowingInfo(undefined);
        },
      });
  }

  setIsShowingInfo(campus: ICampusRes | undefined) {
    this.isShowingInfo = !this.isShowingInfo;

    this.headerTitle = this.isShowingInfo
      ? `Información de la Sede #${campus?.numeral}`
      : 'Sedes registradas';

    if (campus !== undefined) {
      this.campusData = campus;
    }
  }

  get platformsArray() {
    return this.platformsForm.get('platforms') as FormArray;
  }

  openModal() {
    this.modal.showModal();
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.formStatus = 'loading';
    this.modal.close();

    this.campusService.register(this.form.value).subscribe({
      next: (res) => {
        this.formStatus = 'success';
        this.campuses.push(res.data.results[0]);
        this.form.reset();
      },
      error: (error) => {
        this.formStatus = 'failed';
        this.openModal();
        console.log(error);
      },
    });
  }

  private get modal() {
    if (!this.newCampusModal) {
      this.newCampusModal = document.querySelector(
        '#new-campus-modal'
      ) as HTMLDialogElement;
    }

    return this.newCampusModal;
  }

  hasError(controlName: string, error: string) {
    return this.validator.hasError(this.form, controlName, error);
  }
}
