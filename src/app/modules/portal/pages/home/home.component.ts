import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly open = signal<boolean>(false);

  constructor(
    private readonly myCashService: MyCashService,
    private readonly router: Router
  ) {
    this.open.set(!!this.myCashService.myCashRegisters());
    console.log({
      cajas: this.myCashService.myCashRegisters(),
      open: this.open(),
    });
  }

  goToOpenCash() {
    this.router.navigateByUrl('/portal/cajas');
  }
}
