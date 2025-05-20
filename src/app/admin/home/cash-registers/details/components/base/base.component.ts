import { Component } from '@angular/core';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent {
  readonly loading;
  readonly detail;

  constructor(private readonly service: DetailService) {
    this.loading = this.service.loading;
    this.detail = this.service.detail;
  }
}
