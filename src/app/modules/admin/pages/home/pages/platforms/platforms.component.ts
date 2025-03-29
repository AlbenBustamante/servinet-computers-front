import { Component, signal, ViewChild } from '@angular/core';
import { PlatformService } from '@services/platform.service';
import { UpdatePlatformFormComponent } from './components/update-platform-form/update-platform-form.component';

@Component({
  selector: 'app-admin-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent {
  @ViewChild(UpdatePlatformFormComponent)
  updatePlatformForm!: UpdatePlatformFormComponent;
  readonly loading = signal<boolean>(true);
  readonly showSideBar = signal<boolean>(false);
  readonly updatePlatformLoading;

  constructor(private readonly platformService: PlatformService) {
    this.updatePlatformLoading = this.platformService.updatePlatformLoading;
  }

  ngOnInit() {
    this.platformService.getAll().subscribe({
      next: () => this.loading.set(false),
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }

  onEdit() {
    this.showSideBar.set(true);
  }

  onUpdate() {
    this.updatePlatformForm.onSubmit();
    this.onComplete();
  }

  onComplete() {
    this.showSideBar.set(false);
  }
}
