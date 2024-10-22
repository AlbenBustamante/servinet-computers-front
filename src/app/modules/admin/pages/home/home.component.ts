import { Component } from '@angular/core';
import {
  faCashRegister,
  faHardDrive,
  faList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly faPlatforms = faList;
  readonly faCashRegister = faCashRegister;
  readonly faCashSafe = faHardDrive;
  readonly faUser = faUser;
}
