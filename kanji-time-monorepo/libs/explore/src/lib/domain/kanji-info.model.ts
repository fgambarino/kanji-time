export interface KanjiInfoModel {
  id: number;
  kanji: string;
  kunReading: string[];
  onReading: string[];
  meaning: string;
  strokes: number;
  jlpt: 'N5' | 'N4';
}

export interface KanjiInfoEntityList {
  [key: number]: KanjiInfoModel;
}
