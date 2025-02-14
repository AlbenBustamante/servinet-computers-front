import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IPlatformTransferRes } from '@models/platform.model';

@Component({
  selector: 'app-platform-transfers-table',
  templateUrl: './platform-transfers-table.component.html',
  styleUrls: ['./platform-transfers-table.component.css'],
})
export class PlatformTransfersTableComponent {
  @Input({ required: true }) platformTransfers!: IPlatformTransferRes[];
}
