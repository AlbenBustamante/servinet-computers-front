import { Component, EventEmitter, Output } from '@angular/core';
import { SelectedReport } from '../../reports.component';

@Component({
  selector: 'app-change-type-form',
  templateUrl: './change-type-form.component.html',
  styleUrls: ['./change-type-form.component.css'],
})
export class ChangeTypeFormComponent {
  @Output() onChangeReport = new EventEmitter<SelectedReport>();

  emitChangeReport(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as SelectedReport;
    this.onChangeReport.emit(value);
  }
}
