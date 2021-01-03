import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ui-ancient-button',
  templateUrl: './ancient-button.component.html',
  styleUrls: ['./ancient-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AncientButtonComponent {
  @Input() text: string;
  @Output() btnClick: EventEmitter<unknown> = new EventEmitter();

  constructor() {}

  onClick(event: unknown) {
    this.btnClick.emit(event);
  }
}
