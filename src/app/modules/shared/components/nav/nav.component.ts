import { Component, Input, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input({ required: true }) routes!: WritableSignal<IRoute[]>;
  readonly faLogout = faRightFromBracket;

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  logout() {
    // this.authService.logout().subscribe();
    this.tokenService.remove();
    this.router.navigateByUrl('/login');
  }
}
