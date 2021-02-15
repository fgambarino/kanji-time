import { Question } from './../../domain/question.model';
import { PracticeService } from './../services/practice.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { delay, share, switchMap, take, takeUntil } from 'rxjs/operators';
import { UiQuestion } from '@kanji-time-monorepo/shared';

@Component({
  selector: 'prc',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  constructor(private practiceService: PracticeService) {}

  public kanjiQuestion: UiQuestion;
  public numberAnswered = 0;
  public numberCorrect = 0;
  public totalQuestions: number;
  public sectionToShow: 'loading' | 'quiz' | 'result';

  private showNextQuestion$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private destroy$ = new Subject();

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  startTheQuiz() {
    this.sectionToShow = 'loading';

    const questions$ = this.practiceService.getQuestions().pipe(share());

    questions$.subscribe((questions) => {
      this.totalQuestions = questions.length;
      this.sectionToShow = 'quiz';
    });

    zip(
      this.showNextQuestion$,
      questions$.pipe(
        switchMap((questions) => {
          return shuffleArray(questions);
        }),
        take(10)
      )
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([, kanjiQuestion]) => this._setKanjiForQuestion(kanjiQuestion),
        complete: () => (this.sectionToShow = 'result'),
      });
  }

  onAnswer(correct: boolean) {
    ++this.numberAnswered;
    if (correct) {
      ++this.numberCorrect;
    }
    console.log(this.numberCorrect / this.numberAnswered);
    this.showNextQuestion$.next(true);
  }

  private _setKanjiForQuestion({
    kanji,
    otherOptions,
    reading,
    rightOption,
    meaning,
  }: Question) {
    const options = shuffleArray([...otherOptions, rightOption]);
    this.kanjiQuestion = {
      kanji,
      reading,
      rightOption,
      options,
      meaning,
    };
  }
}

function shuffleArray(input) {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
