import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cash-register-details',
  templateUrl: './cash-register-details.component.html',
  styleUrls: ['./cash-register-details.component.css'],
})
export class CashRegisterDetailsComponent {
  @Input() id!: number;

  constructor() {}

  ngOnInit() {
    console.log(this.id);
  }
}
