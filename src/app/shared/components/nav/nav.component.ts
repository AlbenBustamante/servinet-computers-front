import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @Input({ required: true }) routes!: IRoute[];
  readonly faLogout = faRightFromBracket;

  constructor(
    private readonly authService: AuthService,
    // private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout();
    // this.tokenService.remove();
    this.router.navigateByUrl('/auth');
  }
}
