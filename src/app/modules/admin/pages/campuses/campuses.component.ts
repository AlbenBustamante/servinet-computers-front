import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICampusRes } from 'src/app/core/models/campus.model';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { IRoute } from 'src/app/core/models/route.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CampusService } from 'src/app/core/services/campus.service';
import { PlatformService } from 'src/app/core/services/platform.service';
import { UserService } from 'src/app/core/services/user.service';

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

  constructor(
    private readonly userService: UserService,
    private readonly campusService: CampusService,
    private readonly platformService: PlatformService,
    private readonly authService: AuthService,
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
    this.campusService
      .updatePlatforms(this.campusData.id, this.platformsArray.value)
      .subscribe(() => this.setIsShowingInfo(undefined));
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
    this.campusService.register(this.form.value).subscribe({
      next: (res) => {
        this.campuses.push(res.data.results[0]);
        this.modal.close();
      },
      error: (error) => {
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
}
