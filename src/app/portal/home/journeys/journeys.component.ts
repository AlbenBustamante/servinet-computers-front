import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, signal } from '@angular/core';
import { UserService } from '@services/user.service';
import { HomeService } from '../services/home.service';
import { TokenService } from '@services/token.service';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
})
export class JourneysComponent {
  readonly faExcel = faFileExport;
  readonly date = signal<Date>(new Date());
  readonly today = new Date();
  readonly loading;
  readonly journeys;
  readonly exportLoading = signal<boolean>(false);
  readonly exportError = signal<string | undefined>(undefined);

  constructor(
    private readonly service: HomeService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loading = this.service.loading;
    this.journeys = this.service.journeys;
  }

  ngOnInit() {
    this.loading.set(true);

    const { id } = this.tokenService.getInfo();
    const month = this.formatMonth(this.today);

    this.userService.getJourneys(id, month).subscribe({
      next: (journeys) => {
        this.journeys.set(journeys);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  onChangeMonth(event: Event) {
    this.loading.set(true);

    const target = event.target as HTMLInputElement;
    const value = target.value;
    const { id } = this.tokenService.getInfo();

    this.userService.getJourneys(id, value).subscribe({
      next: (journeys) => {
        this.journeys.set(journeys);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  exportToExcel() {
    this.exportLoading.set(true);
    const { id } = this.tokenService.getInfo();
    const month = this.formatMonth(this.today);
    this.userService.exportJourneysToExcel(id, month).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'jornadas.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.exportError.set(undefined);
        this.exportLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.exportError.set('Ha ocurrido un error');
        this.exportLoading.set(false);
      },
    });
  }

  formatMonth(date: Date) {
    return formatDate(date, 'yyyy-MM', this.locale);
  }
}
