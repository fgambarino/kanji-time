import { SharedModule } from '@kanji-time-monorepo/shared';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule.withConfig({
      visibility: 'hover',
    }),
    SharedModule,
  ],
  providers: [
    {
      provide: 'kanji-list-url',
      useValue: '/assets/resources/kanji-list.json',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
