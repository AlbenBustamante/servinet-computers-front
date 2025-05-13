import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IBase } from '@models/base.model';
import { BaseCalculatorComponent } from '@portal/pages/cash-registers/components/base-calculator/base-calculator.component';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css'],
})
export class BaseFormComponent {
  @ViewChild(BaseCalculatorComponent) calculator!: BaseCalculatorComponent;
  @Input({ required: true }) cashRegisterId!: number;
  @Output() setBase = new EventEmitter<IBase>();
  @Output() setObservation = new EventEmitter<string>();
  @Output() register = new EventEmitter();
  @Output() onReturn = new EventEmitter();

  readonly faReturn = faArrowLeft;
  readonly showSideBar = signal<boolean>(false);

  handleShowSideBar() {
    this.showSideBar.update((prevValue) => !prevValue);
  }

  emitBase(base: IBase) {
    this.setBase.emit(base);
  }

  emitObservation(observation: string) {
    this.showSideBar.set(false);
    this.setObservation.emit(observation);
  }

  emitRegister() {
    this.calculator.emitBase();
    this.register.emit();
  }

  emitReturn() {
    this.onReturn.emit();
  }
}
