import { Component, signal } from '@angular/core';
import { BaseService } from '@services/base.service';

@Component({
  selector: 'app-update-base-form',
  templateUrl: './update-base-form.component.html',
  styleUrls: ['./update-base-form.component.css'],
})
export class UpdateBaseFormComponent {
  readonly base;

  constructor(private readonly baseService: BaseService) {
    this.base = signal(this.baseService.cashBase);
  }
}
