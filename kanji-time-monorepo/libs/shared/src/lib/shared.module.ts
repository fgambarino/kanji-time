import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AncientButtonComponent } from './components/ancient-button/ancient-button.component';
import { KanjiCardComponent } from './components/kanji-card/kanji-card.component';
import { AncientCheckboxComponent } from './components/ancient-checkbox/ancient-checkbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AncientButtonComponent,
    KanjiCardComponent,
    AncientCheckboxComponent,
  ],
  exports: [
    AncientButtonComponent,
    KanjiCardComponent,
    AncientCheckboxComponent,
  ],
})
export class SharedModule {}
