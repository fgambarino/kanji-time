import { Question } from '../../domain/question.model';
import { PracticeService } from '../services/practice.service';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, concat, of, Subject, zip } from 'rxjs';
import { map, scan, share, switchMap, takeUntil } from 'rxjs/operators';
import { UiQuestion } from '@kanji-time-monorepo/shared';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'prc',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnDestroy {
  constructor(
    private practiceService: PracticeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public kanjiQuestion: UiQuestion;
  public answersAndSuccess$: Subject<boolean> = new Subject<boolean>();
  public correctAnswers$ = this.answersAndSuccess$.pipe(
    scan((acc, value) => (value ? acc + 1 : acc), 0)
  );
  public answeredQuestions$ = this.answersAndSuccess$.pipe(
    scan((acc) => acc + 1, 0)
  );
  public percentageCorrect$ = zip(
    this.correctAnswers$,
    this.answeredQuestions$
  ).pipe(map(([correct, answered]) => (correct / answered) * 100));
  public totalQuestions: number;
  public sectionToShow: 'loading' | 'quiz' | 'result';
  public resultMessage: string;

  private showNextQuestion$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private destroy$ = new Subject();

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
      concat(
        questions$.pipe(
          switchMap((questions) => {
            return shuffleArray(questions);
          })
        ),
        of(null)
      )
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([, kanjiQuestion]) => {
          if (kanjiQuestion) this._setKanjiForQuestion(kanjiQuestion);
        },
        complete: () => {
          this.sectionToShow = 'result';
        },
      });
  }

  onAnswer(correct: boolean) {
    this.answersAndSuccess$.next(correct);
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

  onBtnClick() {
    this.router.navigate([''], { relativeTo: this.activatedRoute });
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
