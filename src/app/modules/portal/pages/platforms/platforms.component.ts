import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { IPlatformBalanceRes } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';

@Component({
  selector: 'app-portal-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  readonly loading = signal<boolean>(false);
  readonly editing: WritableSignal<boolean>;
  readonly selectedPlatformBalance: WritableSignal<IPlatformBalanceRes | null>;

  constructor(private readonly platformBalanceService: PlatformBalanceService) {
    this.editing = this.platformBalanceService.editing;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.platformBalanceService.loadInitialBalances().subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (_) => {
        this.loading.set(false);
      },
    });
  }
}
