import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAdd, faTools } from '@fortawesome/free-solid-svg-icons';
import { IAdminPlatformDto } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.component.html',
  styleUrls: ['./platform-details.component.css'],
})
export class PlatformDetailsComponent {
  readonly loading = signal<boolean>(false);
  readonly details = signal<IAdminPlatformDto | undefined>(undefined);
  readonly month = signal<string>('');
  readonly faAdd = faAdd;
  readonly faEdit = faTools;

  constructor(
    private readonly platformService: PlatformService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.month.set(new Date().toISOString().slice(0, 7));

    this.platformService.getDetails(id, this.month()).subscribe({
      next: (details) => {
        this.details.set(details);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
