export interface UiQuestion {
  kanji: string;
  reading: 'kun' | 'on';
  options: string[];
  rightOption: string;
  meaning: string;
}
