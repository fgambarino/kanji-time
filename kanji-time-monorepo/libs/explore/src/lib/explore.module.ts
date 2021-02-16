import { SharedModule } from '@kanji-time-monorepo/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { KanjiDetailComponent } from './feature/kanji-detail/kanji-detail.component';
import { KanjiListComponent } from './feature/kanji-list/kanji-list.component';
import { ExploreKanjiService } from './feature/services/explore-kanji.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: KanjiListComponent },
      { path: ':id', component: KanjiDetailComponent },
    ]),
    SharedModule,
  ],
  declarations: [KanjiDetailComponent, KanjiListComponent],
  providers: [ExploreKanjiService],
})
export class ExploreModule {}
