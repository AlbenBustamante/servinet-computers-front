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
})
export class SidebarComponent {
  @Output() onSubmit = new EventEmitter();
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) actionName!: string;
  @Input({ required: true }) showSideBar!: WritableSignal<boolean>;
  @Input({ required: true }) mode!: 'register' | 'update' | 'delete';
  @Input() loading!: boolean;

  emitOnSubmit() {
    this.onSubmit.emit();
  }

  onCancel() {
    this.showSideBar.set(false);
  }

  get modeTitle() {
    switch (this.mode) {
      case 'register':
        return 'Registro';
      case 'update':
        return 'Actualización';
      case 'delete':
        return 'Eliminación';
      default:
        return 'Berserk';
    }
  }
}
