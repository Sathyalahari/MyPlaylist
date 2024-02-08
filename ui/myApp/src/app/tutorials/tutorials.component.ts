import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app.service';
import { Video } from '../../models/video';
import { Router, RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [CommonModule,RouterModule,MatIconModule,FontAwesomeModule],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.css'
})
export class TutorialsComponent implements OnInit{


  buttonItems = [
    'The current button',
    'A second button item',
    'A third button item',
    'A fourth button item'
  ];

  tutorialsList:Video[] = [];
  selected: any;
  selectedIndex: number | null = null;
 
   constructor(private service: AppService, private router:Router){

  }

  ngOnInit() : void{
    this.getAllTutorials();
  }

  getAllTutorials(){
    this.service.getAllTutorials().subscribe((res:any)=>{
      this.tutorialsList = res;
      console.log(this.tutorialsList[0].title);
      this.selected = this.tutorialsList[0];
      this.previewDetails(this.selected._id, 0);
    });
  }

  previewDetails(id:string, i:number){
    this.selected = this.tutorialsList.find(x=>x._id == id );
    console.log(this.selected);
    this.selectedIndex = i;
  }


}
