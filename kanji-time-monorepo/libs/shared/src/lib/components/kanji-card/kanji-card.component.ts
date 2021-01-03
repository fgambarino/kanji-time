import { KanjiInfoModel } from './../../../../../explore/src/lib/domain/kanji-info.model';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'ui-kanji-card',
  templateUrl: './kanji-card.component.html',
  styleUrls: ['./kanji-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanjiCardComponent {
  kanji: string;
  onReading: string;
  kunReading: string;
  meaning: string;

  @Input() set kanjiInfo(value: KanjiInfoModel) {
    const { kanji, onReading, kunReading, meaning } = value;
    this.kanji = kanji;
    this.onReading = onReading.join(', ');
    this.kunReading = kunReading.join(', ');
    this.meaning = meaning;
  }

  constructor() {}
}
