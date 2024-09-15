import { Component } from '@angular/core';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-my-cash-registers',
  templateUrl: './my-cash-registers.component.html',
  styleUrls: ['./my-cash-registers.component.css'],
})
export class MyCashRegistersComponent {
  readonly myCash;

  constructor(private readonly myCashService: MyCashService) {
    this.myCash = this.myCashService.myCash;
  }
}
