import { Component, OnInit, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import { DragAndDropModule } from 'angular-draggable-droppable';
import {List} from './list';
import {Card} from './card';
import { QueryList } from '@angular/core/src/render3';

@Component({
  selector: 'app-board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss']
})
export class BoardContentComponent implements OnInit {
  newCard: string;
  newList: string;
  removeType: string;
  removeListTitle: string;
  removeCardTitle: string;
  dragDrop: string = 'dragged';
  @ViewChildren('cardContainer') cardCount: ElementRef;
  totalCards: number = 0;
  lists: Array<List> = [
    {
      title: "To-Do",
      card:[
        {
          title: 'Shopping'
        }
      ]
    },
    {
      title: "Currently-Working",
      card:[
        {
          title: 'Study'
        }
      ]
    },
    {
      title: "Completed",
      card:[]
    }
  ];
  constructor(private userIdle: UserIdleService, private element: ElementRef) { }

  ngOnInit() {
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!');
      window.location.reload();
    });
  }
  
  ngDoCheck(){
    if(this.cardCount != undefined)
      this.totalCards = this.cardCount['length'];
  }

  dragEnd(event,list,card) {
    this.newCard = card.title;
    if(this.dragDrop == 'dropped'){
      this.remove(list.title, 'Card', card.title);
      this.dragDrop = 'dragged';
    }
  }

  dropped(event,list){
    this.addCard(list.title);
    this.dragDrop = 'dropped';
  }

  addList(){
    if(this.newList == undefined) this.newList = 'Untitled';
    let list = {
      title: this.newList,
      card: []
    }
    this.lists.push(list);
    this.newList = '';
  }

  addCard(list){
    if(this.newCard == undefined) this.newCard = 'Untitled';
    let card = {
      title: this.newCard
    }
    for(let i=0; i<this.lists.length; i++){
      if(list == this.lists[i].title){
        this.lists[i].card.push(card);
        this.newCard = '';
      }
    }
  }

  remove(list, type, card?: string){
    if(type == 'List'){
      for(let i=0; i<this.lists.length; i++){
        if(list == this.lists[i].title){
          this.lists.splice(i,1);
        }
      }
    }
    else{
      for(let i=0; i<this.lists.length; i++){
        if(list == this.lists[i].title){
          for(let j=0; j<this.lists[i].card.length; j++){
            if(card == this.lists[i].card[j].title)
              this.lists[i].card.splice(j,1);
            if(type.indexOf('all') != -1)
              this.lists[i].card = [];
          }
        }
      }
    }
  }

  setVar(title, type, card?: string){
    this.removeListTitle = title;
    this.removeType = type;
    if(card)
      this.removeCardTitle = card;
  }

  dragging(event){
    console.log(event)

  }
}
