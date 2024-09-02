import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-new-transaction-form',
  templateUrl: './new-transaction-form.component.html',
  styleUrls: ['./new-transaction-form.component.css'],
})
export class NewTransactionFormComponent {
  readonly changeComission = signal<boolean>(false);

  toggleChangeComission() {
    this.changeComission.update((prevValue) => !prevValue);
  }
}
