import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AncientButtonComponent } from './components/ancient-button/ancient-button.component';
import { KanjiCardComponent } from './components/kanji-card/kanji-card.component';
import { AncientCheckboxComponent } from './components/ancient-checkbox/ancient-checkbox.component';
import { OptionBarComponent } from './components/option-bar/option-bar.component';
import { AncientInputComponent } from './components/ancient-input/ancient-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    AncientButtonComponent,
    KanjiCardComponent,
    AncientCheckboxComponent,
    OptionBarComponent,
    AncientInputComponent,
  ],
  exports: [
    AncientButtonComponent,
    KanjiCardComponent,
    AncientCheckboxComponent,
    OptionBarComponent,
    AncientInputComponent,
  ],
})
export class SharedModule {}
