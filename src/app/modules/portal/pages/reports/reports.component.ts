import { Component, signal } from '@angular/core';
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons';
import { IReportsRes } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { lastValueFrom } from 'rxjs';

type SelectedReport =
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
  readonly reports = signal<IReportsRes | null>(null);
  readonly selectedReport = signal<SelectedReport | null>(null);
  readonly faEdit = faPencil;
  readonly faRemove = faRemove;

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

  onChangeReport(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as SelectedReport;

    this.selectedReport.set(value);
  }
}
