import { Component, OnInit } from '@angular/core';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { PlatformService } from 'src/app/core/services/platform.service';

@Component({
  selector: 'app-new-transfer-form',
  templateUrl: './new-transfer-form.component.html',
  styleUrls: ['./new-transfer-form.component.css'],
})
export class NewTransferFormComponent implements OnInit {
  platforms: IPlatformRes[];
  numbers: number[] = [];
  private readonly maxAmount: number = 10;

  constructor(private readonly platformService: PlatformService) {
    this.platforms = this.platformService.getAll();
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.maxAmount; i++) {
      this.numbers.push(i);
    }
  }
}
