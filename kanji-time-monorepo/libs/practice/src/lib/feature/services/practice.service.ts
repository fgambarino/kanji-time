import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  KanjiInfoEntityList,
  KanjiInfoModel,
} from '@kanji-time-monorepo/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../../domain/question.model';

@Injectable()
export class PracticeService {
  constructor(
    private httpClient: HttpClient,
    @Inject('kanji-list-url') private kanjiListUrl: string
  ) {}

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<KanjiInfoEntityList>(this.kanjiListUrl).pipe(
      map((kanjiList) => {
        const kanjiValues: KanjiInfoModel[] = Object.values(kanjiList);
        const allKunReadings = kanjiValues.flatMap((x) => x.kunReading);
        const allOnReadings = kanjiValues.flatMap((x) => x.onReading);
        return kanjiValues.reduce(
          (list: Question[], currentKanji: KanjiInfoModel) => {
            const kanjiAvailableReadings: string[] = [
              ...(currentKanji.kunReading?.length ? ['kun'] : []),
              ...(currentKanji.onReading?.length ? ['on'] : []),
            ];
            if (!kanjiAvailableReadings.length) return list;
            const randomReading =
              kanjiAvailableReadings[
                Math.floor(Math.random() * kanjiAvailableReadings.length)
              ];

            const readingAvailableOptions =
              currentKanji[`${randomReading}Reading`];
            const rightOption =
              readingAvailableOptions[
                Math.floor(Math.random() * readingAvailableOptions.length)
              ];
            let allOtherAvailableOptions;
            if (randomReading === 'kun') {
              allOtherAvailableOptions = allKunReadings;
            } else if (randomReading === 'on') {
              allOtherAvailableOptions = allOnReadings;
            } else {
              throw new Error(
                'on or kun reading only are to be used, unexpected error'
              );
            }

            const otherOptions = [];
            while (otherOptions.length < 2) {
              const randomOption =
                allOtherAvailableOptions[
                  Math.floor(Math.random() * allOtherAvailableOptions.length)
                ];

              if (
                !readingAvailableOptions.includes(randomOption) &&
                !otherOptions.includes(randomOption)
              ) {
                otherOptions.push(randomOption);
              }
            }
            list.push({
              kanji: currentKanji.kanji,
              reading: randomReading,
              rightOption,
              otherOptions,
              meaning: currentKanji.meaning,
            });
            return list;
          },
          []
        );
      })
    );
  }
}
