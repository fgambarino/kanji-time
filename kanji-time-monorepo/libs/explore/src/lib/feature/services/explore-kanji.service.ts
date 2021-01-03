import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KanjiInfoEntityList } from '../../domain/kanji-info.model';

@Injectable()
export class ExploreKanjiService {
  constructor(
    private httpClient: HttpClient,
    @Inject('kanji-list-url') private kanjiListUrl: string
  ) {}

  getKanjiList(): Observable<KanjiInfoEntityList> {
    return this.httpClient.get<KanjiInfoEntityList>(this.kanjiListUrl);
  }
}
