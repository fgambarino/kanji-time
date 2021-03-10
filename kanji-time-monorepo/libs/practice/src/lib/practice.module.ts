import { SharedModule } from '@kanji-time-monorepo/shared';
import { PracticeService } from './feature/services/practice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './feature/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultMessagePipe } from './feature/services/result-message.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: QuizComponent },
    ]),
    SharedModule,
  ],
  declarations: [QuizComponent, ResultMessagePipe],
  providers: [PracticeService],
})
export class PracticeModule {}
