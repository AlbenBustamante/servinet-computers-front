import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from '@models/platform.model';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
import { PlatformService } from '@services/platform.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  isShowingInfo: boolean = false;
  headerTitle: string = 'Plataformas registradas';
  platforms: IPlatformRes[] = [];
  platformInfo: IPlatformRes = {
    available: false,
    createdAt: '',
    updatedAt: '',
    id: -1,
    name: '',
  };
  newPlatformModal!: HTMLDialogElement;
  form: FormGroup;
  platformsStatus: RequestStatus = 'loading';
  formStatus: RequestStatus = 'init';

  constructor(
    private readonly platformService: PlatformService,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly validator: GeneralValidators
  ) {
    this.platformService.getAll().subscribe({
      next: (res) => {
        this.platforms = res.data.results;
        this.platformsStatus = 'success';
      },
      error: (error) => {
        this.platformsStatus = 'failed';
      },
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.getUser()?.subscribe();
  }

  setIsShowingInfo(platform: IPlatformRes | undefined): void {
    this.isShowingInfo = !this.isShowingInfo;

    this.headerTitle = this.isShowingInfo
      ? `${platform?.name}`
      : 'Plataformas registradas';

    if (platform !== undefined) {
      this.platformInfo = platform;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.modal.close();
    this.formStatus = 'loading';

    this.platformService.register(this.form.value).subscribe({
      next: (res) => {
        this.formStatus = 'success';
        this.form.reset();
        this.platforms.push(res.data.results[0]);
      },
      error: (err) => {
        this.formStatus = 'failed';
        console.log(err);
      },
    });
  }

  openModal() {
    this.modal.showModal();
  }

  private get modal() {
    if (!this.newPlatformModal) {
      this.newPlatformModal = document.querySelector(
        '#new-platform-modal'
      ) as HTMLDialogElement;
    }

    return this.newPlatformModal;
  }

  hasError(controlName: string, error: string) {
    return this.validator.hasError(this.form, controlName, error);
  }
}
