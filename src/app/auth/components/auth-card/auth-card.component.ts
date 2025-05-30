import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
})
export class AuthCardComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) action!: string;
  @Input({ required: true }) route!: string;

  constructor(private readonly router: Router) {}

  goTo() {
    this.router.navigateByUrl(`/auth/${this.route}`);
  }
}
