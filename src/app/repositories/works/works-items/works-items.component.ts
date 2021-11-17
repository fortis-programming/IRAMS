import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WorksModel } from 'src/app/_shared/models/works.model';

@Component({
  selector: 'app-works-items',
  templateUrl: './works-items.component.html',
  styleUrls: ['./works-items.component.scss']
})
export class WorksItemsComponent implements OnInit {
  @Input() workItem: WorksModel = {
    projectId: '',
    title: '',
    type: '',
    updatedAt: '',
    status: '',
    members: [],
    validator: '',
    college: '',
    data: ''
  }
  
  @Input() workId: string = '';
  
  members: Array<string> = [];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.extractMembers();
  }
  
  //  OPEN A REPOSITORY PROJECT
  openRepository(repositoryId: string): void {
    this.router.navigate(['../app/repositories/preview', repositoryId]);
  }
  
  // EXTRACT AUTHORS
  extractMembers(): void {
    this.workItem.members.map(member => {
      this.members.push(JSON.parse(JSON.stringify(member)))
    })
    // this.workItem.members.forEach(member => {
    //   let data = (Object.values(JSON.parse(JSON.stringify(member)))[0]);
    //   this.members.push(JSON.parse(JSON.stringify(data)));
    // })
  }
}
