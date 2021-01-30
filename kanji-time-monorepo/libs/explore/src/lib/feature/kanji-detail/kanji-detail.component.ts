import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ExploreKanjiService } from './../services/explore-kanji.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'exp-kanji-detail',
  templateUrl: './kanji-detail.component.html',
  styleUrls: ['./kanji-detail.component.scss'],
})
export class KanjiDetailComponent implements OnInit, OnDestroy {
  kanji: string;
  meaning: string;
  strokes: number;
  onReading: string[];
  kunReading: string[];
  jlpt: string;
  multipleMeanings = false;

  private destroy$ = new Subject();

  constructor(
    private exploreKanjiService: ExploreKanjiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((pm: ParamMap) =>
          this.exploreKanjiService.getKanjiById(pm.get('id'))
        )
      )
      .subscribe(({ kanji, meaning, onReading, kunReading, jlpt, strokes }) => {
        this.kanji = kanji;
        this.meaning = meaning;
        this.multipleMeanings = /.+,.+/.test(meaning);
        this.onReading = onReading;
        this.kunReading = kunReading;
        this.strokes = strokes;
        this.jlpt = jlpt;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
