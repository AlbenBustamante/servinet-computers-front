import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() onSubmit = new EventEmitter();
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) actionName!: string;
  @Input({ required: true }) showSideBar!: WritableSignal<boolean>;

  emitOnSubmit() {
    this.onSubmit.emit();
  }

  onCancel() {
    this.showSideBar.set(false);
  }
}
