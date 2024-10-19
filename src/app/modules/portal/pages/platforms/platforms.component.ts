import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Role } from '@models/enums';
import { IPortalPlatform } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-portal-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  readonly loading = signal<boolean>(false);
  readonly editing: WritableSignal<boolean>;
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;
  readonly description;

  constructor(
    private readonly platformService: PlatformService,
    private readonly tokenService: TokenService
  ) {
    this.editing = this.platformService.editing;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;

    const role = this.tokenService.getInfo().role;

    this.description =
      role === Role.SUPERVISOR
        ? 'Eres libre de editarlos y añadir transferencias'
        : 'Eres libre de añadir transferencias';
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.platformService.loadPortalPlatforms().subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (_) => {
        this.loading.set(false);
      },
    });
  }
}
