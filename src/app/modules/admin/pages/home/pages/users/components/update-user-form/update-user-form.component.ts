import { Component, EventEmitter, Output } from '@angular/core';
import { IUpdateUserDto } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css'],
})
export class UpdateUserFormComponent {
  @Output() onComplete = new EventEmitter<void>();
  readonly form;
  readonly userId;
  readonly loading;

  constructor(private readonly userService: UserService) {
    this.form = userService.updateUserForm;
    this.userId = userService.userToUpdateId;
    this.loading = userService.userToUpdateLoading;
  }

  emitOnComplete() {
    this.setLoading(true);

    const dto: IUpdateUserDto = this.form.value;

    this.userService.update(this.userId(), dto).subscribe({
      next: (_) => {
        this.form.reset();
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
      complete: () => this.onComplete.emit(),
    });
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);

    loading ? this.form.disable() : this.form.enable();
  }
}
