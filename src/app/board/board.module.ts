import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BoardContentComponent } from './board-content/board-content.component';
import { DragAndDropModule } from 'angular-draggable-droppable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragAndDropModule.forRoot()
  ],
  declarations: [BoardHeaderComponent, BoardContentComponent],
  exports: [BoardHeaderComponent, BoardContentComponent]
})
export class BoardModule { }
