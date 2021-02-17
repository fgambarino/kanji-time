import { Question } from './../../domain/question.model';
import { PracticeService } from './../services/practice.service';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { share, switchMap, take, takeUntil } from 'rxjs/operators';
import { UiQuestion } from '@kanji-time-monorepo/shared';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
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
  public numberAnswered = 0;
  public numberCorrect = 0;
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
      questions$.pipe(
        switchMap((questions) => {
          return shuffleArray(questions);
        })
      )
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([, kanjiQuestion]) => this._setKanjiForQuestion(kanjiQuestion),
        complete: () => {
          this.sectionToShow = 'result';
          this.resultMessage = this.getResultMessage();
        },
      });
  }

  getResultMessage(): string {
    const percentage = this.numberCorrect / this.numberAnswered;
    if (percentage < 0.4) {
      return 'You need to study and practice more! 😬';
    } else if (percentage < 0.6) {
      return "Good, but it's not enough! 😝";
    } else if (percentage < 0.8) {
      return "Great! You're almost there! 💪";
    } else if (percentage < 1) {
      return 'Wonderful! You are just one step far from perfection! 😎';
    } else {
      return 'Flawless victory! 💯';
    }
  }

  onAnswer(correct: boolean) {
    ++this.numberAnswered;
    if (correct) {
      ++this.numberCorrect;
    }
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
