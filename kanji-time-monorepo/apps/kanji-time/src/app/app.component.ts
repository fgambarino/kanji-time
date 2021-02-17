import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'kanji-time-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kanji-time';
  copyDate = new Date().getFullYear();

  ngOnInit(): void {
    this._allViewPortVisibleAlways();

    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this._allViewPortVisibleAlways();
      });
  }

  private _allViewPortVisibleAlways() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
