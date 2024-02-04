import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { IRoute } from 'src/app/core/models/route.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PlatformService } from 'src/app/core/services/platform.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  routes: IRoute[] = [
    { icon: 'home', title: 'Admin', route: '/admin' },
    { title: 'Plataformas' },
  ];
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

  constructor(
    private readonly platformService: PlatformService,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {
    this.platformService
      .getAll()
      .subscribe((res) => (this.platforms = res.data.results));

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
    this.platformService.register(this.form.value).subscribe({
      next: (res) => {
        this.platforms.push(res.data.results[0]);
        this.modal.close();
      },
      error: (err) => {
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
}
