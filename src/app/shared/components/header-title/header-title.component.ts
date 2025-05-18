import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css'],
})
export class HeaderTitleComponent {
  @Input({ required: true }) hTitle?: string;
  @Input({ required: true }) hDescription!: string;
  @Input() hDescriptionSecondLine!: string;
  @Input() return!: boolean;
  readonly faReturn = faLongArrowLeft;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  goToBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
