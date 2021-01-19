import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-option-bar',
  templateUrl: './option-bar.component.html',
  styleUrls: ['./option-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
