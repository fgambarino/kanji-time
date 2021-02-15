import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goExplore() {
    this.router.navigate(['explore']);
  }

  goPractice() {
    this.router.navigate(['practice']);
  }
}
