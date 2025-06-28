import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() background: 'body' | 'white' = 'body';
  @Input() big: boolean = false;
}
