import { Component, signal } from '@angular/core';
import { IReportsRes } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { lastValueFrom } from 'rxjs';

export type SelectedReport =
  | 'platformTransfers'
  | 'expenses'
  | 'discounts'
  | 'transactions';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  readonly loading = signal<boolean>(false);
  readonly reports = signal<IReportsRes | undefined>(undefined);
  readonly selectedReport = signal<SelectedReport | undefined>(undefined);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  async ngOnInit() {
    this.loading.set(true);

    try {
      if (!this.authService.loggedIn()) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const reports = await lastValueFrom(this.userService.getReports());

      this.reports.set(reports);
    } catch (error) {
      console.log(error);
    }

    this.loading.set(false);
  }

  onChangeReport(selectedReport: SelectedReport) {
    this.selectedReport.set(selectedReport);
  }
}
