import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { IRoute } from 'src/app/core/models/route.model';
import { PlatformService } from 'src/app/core/services/platform.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent {
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
  form: FormGroup;

  constructor(
    private readonly platformService: PlatformService,
    private readonly formBuilder: FormBuilder
  ) {
    this.platformService
      .getAll()
      .subscribe((res) => (this.platforms = res.data.results));

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
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
}
