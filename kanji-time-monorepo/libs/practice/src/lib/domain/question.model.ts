export interface Question {
  kanji: string;
  reading: 'kun' | 'on';
  otherOptions: string[];
  rightOption: string;
  meaning: string;
}
