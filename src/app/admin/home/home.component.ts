import { Component, signal } from '@angular/core';
import {
  faCashRegister,
  faHardDrive,
  faList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ITempCodeRes } from '@models/temp-code.model';
import { TempCodeService } from '@services/temp-code.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly tempCode = signal<ITempCodeRes | undefined>(undefined);
  readonly faPlatforms = faList;
  readonly faCashRegister = faCashRegister;
  readonly faCashSafe = faHardDrive;
  readonly faUser = faUser;

  constructor(private readonly tempCodeService: TempCodeService) {}

  ngOnInit() {
    this.tempCodeService.loadTempCode().subscribe({
      next: (tempCode) => this.tempCode.set(tempCode),
      error: (err) => console.log(err),
    });
  }
}
