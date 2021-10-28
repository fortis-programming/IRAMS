import { Component, OnInit, Input } from '@angular/core';
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
    memebers: ''
  }
  constructor() { }

  ngOnInit(): void {
    return;
  }

}
