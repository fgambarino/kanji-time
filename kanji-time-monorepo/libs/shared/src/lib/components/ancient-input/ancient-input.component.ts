import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ui-ancient-input',
  templateUrl: './ancient-input.component.html',
  styleUrls: ['./ancient-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AncientInputComponent implements OnInit, OnDestroy {
  @Output() textChanged = new EventEmitter<string>();

  search = new FormControl('');
  destroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe(this.textChanged);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  clear() {
    this.search.setValue('');
  }
}
