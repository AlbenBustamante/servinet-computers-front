import { formatDate } from '@angular/common';
import { Component, computed, Inject, LOCALE_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { DetailService } from '@admin/administration/users/services/detail.service';
import { zip } from 'rxjs';
import { IUserRes } from '@models/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  readonly id;
  readonly loading;
  readonly journeys;
  readonly user = signal<IUserRes | undefined>(undefined);
  readonly date = signal<Date>(new Date());
  readonly fullName = computed(() => {
    const user = this.user();
    return `${user?.name} ${user?.lastName}`;
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly detailService: DetailService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = this.detailService.loading;
    this.journeys = this.detailService.journeys;
  }

  ngOnInit() {
    this.loading.set(true);

    const calls = zip(
      this.userService.getJourneys(this.id, this.formatDate(this.date())),
      this.userService.get(this.id)
    );

    calls.subscribe({
      next: ([journeys, user]) => {
        this.journeys.set(journeys);
        this.user.set(user);
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
    const date = target.value;

    this.userService.getJourneys(this.id, date).subscribe({
      next: (journeys) => {
        this.journeys.set(journeys);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  formatDate(date: Date) {
    return formatDate(date, 'yyyy-MM', this.locale);
  }
}
