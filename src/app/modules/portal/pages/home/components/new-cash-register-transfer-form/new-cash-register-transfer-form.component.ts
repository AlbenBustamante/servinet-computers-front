import { Component, signal } from '@angular/core';
import { IUserRes } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-new-cash-register-transfer-form',
  templateUrl: './new-cash-register-transfer-form.component.html',
  styleUrls: ['./new-cash-register-transfer-form.component.css'],
})
export class NewCashRegisterTransferFormComponent {
  readonly users = signal<IUserRes[]>([]);

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (res) => this.users.set(res),
      error: (error) => console.log(error),
    });
  }
}
