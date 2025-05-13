import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-final-working-hour-form',
  templateUrl: './final-working-hour-form.component.html',
  styleUrls: ['./final-working-hour-form.component.css'],
})
export class FinalWorkingHourFormComponent {
  @Input({ required: true }) form!: FormGroup;
}
