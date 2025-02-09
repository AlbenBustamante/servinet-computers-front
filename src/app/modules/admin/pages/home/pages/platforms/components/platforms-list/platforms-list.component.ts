import { Component, WritableSignal } from '@angular/core';
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons';
import { IPlatformRes } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.css'],
})
export class PlatformsListComponent {
  readonly platforms: WritableSignal<IPlatformRes[]>;
  readonly faEdit = faPencil;
  readonly faRemove = faRemove;

  constructor(private readonly platformService: PlatformService) {
    this.platforms = this.platformService.platforms;
  }
}
