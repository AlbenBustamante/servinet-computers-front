import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { PlatformService } from 'src/app/core/services/platform.service';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-new-transfer-form',
  templateUrl: './new-transfer-form.component.html',
  styleUrls: ['./new-transfer-form.component.css'],
})
export class NewTransferFormComponent implements OnInit {
  platforms: IPlatformRes[];
  numbers: number[] = [];
  form: FormGroup;
  private readonly maxAmount: number = 10;

  constructor(
    private readonly platformService: PlatformService,
    private readonly transferService: TransferService,
    private readonly fb: FormBuilder
  ) {
    this.platforms = this.platformService.getAll();

    this.form = this.fb.group({
      platform: ['', Validators.required],
      value: ['', Validators.required],
      amount: [1],
    });
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.maxAmount; i++) {
      this.numbers.push(i);
    }
  }

  onSubmit(): void {
    this.transferService.register(this.form.value);
    console.log(this.transferService.getAll());
  }
}
