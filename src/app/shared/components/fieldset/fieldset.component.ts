import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
})
export class FieldsetComponent {
  @Input({ required: true }) legend!: string;
}
