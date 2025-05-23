import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, signal } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
})
export class JourneysComponent {
  readonly loading = signal<boolean>(false);
  readonly journeys = signal<ICashRegisterDetailRes[]>([]);
  readonly date = signal<Date>(new Date());
  readonly today = new Date();
  readonly loggedIn;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loggedIn = this.authService.loggedIn;
  }

  ngOnInit() {
    this.loading.set(true);

    const { id } = this.loggedIn()!;
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

  private formatMonth(date: Date) {
    return formatDate(date, 'yyyy-MM', this.locale);
  }
}
