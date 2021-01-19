import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AncientButtonComponent } from './components/ancient-button/ancient-button.component';
import { KanjiCardComponent } from './components/kanji-card/kanji-card.component';
import { AncientCheckboxComponent } from './components/ancient-checkbox/ancient-checkbox.component';
import { OptionBarComponent } from './components/option-bar/option-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AncientButtonComponent,
    KanjiCardComponent,
    AncientCheckboxComponent,
    OptionBarComponent,
  ],
  exports: [
    AncientButtonComponent,
    KanjiCardComponent,
    AncientCheckboxComponent,
    OptionBarComponent,
  ],
})
export class SharedModule {}
