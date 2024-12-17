import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
  readonly loading;
  readonly details;

  constructor(private readonly myHomeService: MyHomeService) {
    this.details = this.myHomeService.details;
    this.loading = this.myHomeService.loading;
  }
}
