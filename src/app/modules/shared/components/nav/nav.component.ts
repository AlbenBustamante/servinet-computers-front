import { Component, Input, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input({ required: true }) routes!: WritableSignal<IRoute[]>;
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logout() {
    this.loading = true;
    this.authService.logout().subscribe(() => {
      this.loading = false;
      this.router.navigateByUrl('/login');
    });
  }
}
