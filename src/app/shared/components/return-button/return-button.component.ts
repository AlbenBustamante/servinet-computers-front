import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
})
export class ReturnButtonComponent {
  readonly faReturn = faLongArrowLeft;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  goToBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
