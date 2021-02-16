import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  {
    path: 'explore',
    loadChildren: () =>
      import('@kanji-time-monorepo/explore').then((m) => m.ExploreModule),
  },
  {
    path: 'practice',
    loadChildren: () =>
      import('@kanji-time-monorepo/practice').then((m) => m.PracticeModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
