import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserIdleModule } from 'angular-user-idle';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { BoardModule } from './board/board.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BoardModule,
    UserIdleModule.forRoot({idle: 60, timeout: 5, ping: 5}),
    DragAndDropModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
