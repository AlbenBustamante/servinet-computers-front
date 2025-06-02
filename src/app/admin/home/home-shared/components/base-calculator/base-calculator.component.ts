import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBaseDetail } from '@models/base.model';

@Component({
  selector: 'app-base-calculator',
  templateUrl: './base-calculator.component.html',
})
export class BaseCalculatorComponent {
  @Output() onSubmit = new EventEmitter();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) base!: {
    title: string;
    value: number;
    total: number;
  }[];
  @Input({ required: true }) baseDetail!: IBaseDetail | undefined;

  constructor() {}

  emitOnSubmit() {
    this.onSubmit.emit();
  }
}
