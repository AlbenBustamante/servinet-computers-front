import { Component } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bank-deposits',
  templateUrl: './bank-deposits.component.html',
  styleUrls: ['./bank-deposits.component.css'],
})
export class BankDepositsComponent {
  readonly faAdd = faAdd;
}
