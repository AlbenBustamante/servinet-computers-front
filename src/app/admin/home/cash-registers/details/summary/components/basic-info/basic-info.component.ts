import { Component } from '@angular/core';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent {
  readonly reports;
  readonly loading;

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
    this.loading = this.service.loading;
  }
}
