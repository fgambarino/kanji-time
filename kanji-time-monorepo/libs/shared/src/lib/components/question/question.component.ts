import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { UiQuestion } from '../../models/ui-question.model';

@Component({
  selector: 'ui-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
  @Input() set question(value: UiQuestion) {
    this.showOptions = true;
    this.input = value;
  }
  @Output() answer = new EventEmitter<boolean>();

  input: UiQuestion;
  showOptions: boolean;
  answeredCorrectly: boolean;

  constructor() {}

  ngOnInit(): void {}

  onBtnClick(optionClicked: string) {
    this.showOptions = false;
    this.answeredCorrectly = optionClicked === this.input.rightOption;
  }

  next() {
    this.answer.emit(this.answeredCorrectly ? true : false);
  }
}
