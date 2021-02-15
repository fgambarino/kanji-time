import {
  KanjiInfoEntityList,
  KanjiInfoModel,
} from '@kanji-time-monorepo/shared';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExploreKanjiService {
  constructor(
    private httpClient: HttpClient,
    @Inject('kanji-list-url') private kanjiListUrl: string
  ) {}

  getKanjiList(): Observable<KanjiInfoEntityList> {
    return this.httpClient.get<KanjiInfoEntityList>(this.kanjiListUrl);
  }

  getKanjiById(id: string): Observable<KanjiInfoModel> {
    return this.getKanjiList().pipe(map((result) => result[id]));
  }
}
