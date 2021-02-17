import { KanjiInfoModel } from '../../models/kanji-info.model';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ui-kanji-card',
  templateUrl: './kanji-card.component.html',
  styleUrls: ['./kanji-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanjiCardComponent {
  kanji: string;
  onReading: string[];
  kunReading: string[];
  meaning: string;

  @Input() set kanjiInfo(value: KanjiInfoModel) {
    const { kanji, onReading, kunReading, meaning } = value;
    this.kanji = kanji;
    this.onReading = onReading;
    this.kunReading = kunReading;
    this.meaning = meaning;
  }

  constructor() {}
}
