import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { CampusService } from 'src/app/core/services/campus.service';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-new-transfer-form',
  templateUrl: './new-transfer-form.component.html',
  styleUrls: ['./new-transfer-form.component.css'],
})
export class NewTransferFormComponent implements OnInit {
  platforms!: IPlatformRes[];
  numbers: number[] = [];
  form: FormGroup;
  private readonly maxAmount: number = 10;

  constructor(
    private readonly campusService: CampusService,
    private readonly transferService: TransferService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      platformName: ['', Validators.required],
      value: ['', Validators.required],
      amount: [1],
    });
  }

  ngOnInit(): void {
    this.campusService
      .get(1) // temporal
      .subscribe((res) => {
        this.platforms = res.data.results[0].platforms;
      });

    for (let i = 1; i <= this.maxAmount; i++) {
      this.numbers.push(i);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.transferService
        .register(this.form.value)
        .subscribe((res) => console.log(res));
    }
  }
}
