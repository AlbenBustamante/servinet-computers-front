import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: IconDefinition;
  @Input({ required: true }) type!: 'submit' | 'button';
  @Input() color: 'primary' | 'neutral' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
}
