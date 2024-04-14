import { Component, inject } from '@angular/core';
import { BaseService } from '@services/base.service';

@Component({
  selector: 'app-base-calculator-form',
  templateUrl: './base-calculator-form.component.html',
  styleUrls: ['./base-calculator-form.component.css'],
})
export class BaseCalculatorFormComponent {
  private readonly baseService = inject(BaseService);
  readonly cashBase = this.baseService.cashBase;
}
