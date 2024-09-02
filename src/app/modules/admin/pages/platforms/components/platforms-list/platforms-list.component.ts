import { Component, WritableSignal } from '@angular/core';
import { IPlatformRes } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.css'],
})
export class PlatformsListComponent {
  readonly platforms: WritableSignal<IPlatformRes[]>;

  constructor(private readonly platformService: PlatformService) {
    this.platforms = this.platformService.platforms;
  }
}
