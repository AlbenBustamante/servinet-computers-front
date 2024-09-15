import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-my-cash-registers-list',
  templateUrl: './my-cash-registers-list.component.html',
  styleUrls: ['./my-cash-registers-list.component.css'],
})
export class MyCashRegistersListComponent {
  readonly myCashRegisters;

  constructor(
    private readonly myCashService: MyCashService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.myCashRegisters = this.myCashService.myCashRegisters;
  }

  goToDetails() {
    const cashRegisterDetailId = this.myCashService.myCashRegisters()[0].id;

    this.router.navigate(['./detalles', cashRegisterDetailId], {
      relativeTo: this.route,
    });
  }
}
