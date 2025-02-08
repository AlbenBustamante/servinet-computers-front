import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBaseDetail } from '@models/base.model';

@Component({
  selector: 'app-adm-base-calculator',
  templateUrl: './adm-base-calculator.component.html',
  styleUrls: ['./adm-base-calculator.component.css'],
})
export class AdmBaseCalculatorComponent {
  @Output() submit = new EventEmitter();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) base!: {
    title: string;
    value: number;
    total: number;
  }[];
  @Input({ required: true }) baseDetail!: IBaseDetail | undefined;

  constructor() {}

  onSubmit() {
    this.submit.emit();
  }
}
