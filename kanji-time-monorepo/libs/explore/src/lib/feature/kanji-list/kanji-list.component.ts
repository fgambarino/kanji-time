import { KanjiInfoModel } from './../../domain/kanji-info.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExploreKanjiService } from '../services/explore-kanji.service';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'exp-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.scss'],
})
export class KanjiListComponent implements OnInit, OnDestroy {
  private _kanjiList: KanjiInfoModel[];
  visibleKanjiList$ = new Subject<KanjiInfoModel[]>();
  destroy$ = new Subject();

  constructor(
    private kanjiService: ExploreKanjiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.kanjiService
      .getKanjiList()
      .pipe(
        takeUntil(this.destroy$),
        map((result) =>
          Object.values(result).sort((a, b) => a.strokes - b.strokes)
        )
      )
      .subscribe((result) => {
        this._kanjiList = result;
        this.visibleKanjiList$.next(result);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // onCheckChange(event: any) {
  //   console.log(event);
  // }

  onCardClick(info: KanjiInfoModel) {
    this.router.navigate([info.id], { relativeTo: this.activatedRoute });
  }

  onTextChanged(text: string) {
    this.visibleKanjiList$.next(
      text
        ? this._kanjiList.filter((k) => k.meaning.includes(text))
        : this._kanjiList
    );
  }

  trackById(model: KanjiInfoModel) {
    return model.id;
  }
}
