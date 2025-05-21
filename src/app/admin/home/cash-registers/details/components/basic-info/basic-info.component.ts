import { Component } from '@angular/core';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent {
  readonly detail;
  readonly loading;

  constructor(private readonly service: DetailService) {
    this.detail = this.service.detail;
    this.loading = this.service.loading;
  }
}
