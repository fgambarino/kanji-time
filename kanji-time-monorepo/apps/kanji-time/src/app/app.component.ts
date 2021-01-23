import { Component } from '@angular/core';

@Component({
  selector: 'kanji-time-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kanji-time';
  copyDate = new Date().getFullYear();
}
