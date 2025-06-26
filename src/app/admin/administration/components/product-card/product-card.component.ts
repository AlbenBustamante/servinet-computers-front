import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) pTitle!: string;
  @Input({ required: true }) pIcon!: IconProp;
  @Input({ required: true }) pRoute!: string;
}
