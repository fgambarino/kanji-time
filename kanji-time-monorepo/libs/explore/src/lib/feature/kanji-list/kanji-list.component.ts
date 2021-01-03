import {
  KanjiInfoEntityList,
  KanjiInfoModel,
} from './../../domain/kanji-info.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ExploreKanjiService } from '../services/explore-kanji.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'exp-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.scss'],
})
export class KanjiListComponent implements OnInit, OnDestroy {
  kanjiList: KanjiInfoModel[];
  destroy$ = new Subject();

  constructor(
    private kanjiService: ExploreKanjiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.kanjiService
      .getKanjiList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: KanjiInfoEntityList) => {
        this.kanjiList = Object.values(result);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onCheckChange(event: any) {
    console.log(event);
  }

  onCardClick(info: KanjiInfoModel) {
    this.router.navigate([info.id], { relativeTo: this.activatedRoute });
  }
}
