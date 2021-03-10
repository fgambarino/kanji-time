import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultMessage',
})
export class ResultMessagePipe implements PipeTransform {
  transform(percentage: number): string {
    if (percentage < 40) {
      return 'You need to study and practice more! 😬';
    } else if (percentage < 60) {
      return "Good, but it's not enough! 😝";
    } else if (percentage < 80) {
      return "Great! You're almost there! 💪";
    } else if (percentage < 100) {
      return 'Wonderful! You are just one step far from perfection! 😎';
    } else {
      return 'Flawless victory 💯';
    }
  }
}
