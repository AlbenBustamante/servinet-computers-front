import { Component } from '@angular/core';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent {
  readonly detail;
  readonly loading;

  constructor(private readonly service: DetailService) {
    this.detail = this.service.selectedDetail;
    this.loading = this.service.loading;
  }
}
