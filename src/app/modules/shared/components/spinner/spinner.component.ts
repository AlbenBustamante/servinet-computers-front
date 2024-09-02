import { Component, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  @Input({ required: true }) loading!: WritableSignal<boolean>;
}
