import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

let uniqueId = 0;

@Component({
  selector: 'ui-ancient-checkbox',
  templateUrl: './ancient-checkbox.component.html',
  styleUrls: ['./ancient-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AncientCheckboxComponent implements OnInit {
  @Input() label: string;
  @Input() isChecked: boolean;
  id = uniqueId++;

  @Output() checkChange: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.checkChange.emit(event.target.checked);
  }
  onClick(event: any) {
    console.log(event);
  }
}
