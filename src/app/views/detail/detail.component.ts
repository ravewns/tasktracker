import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TaskType} from "../../../types/task.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit  {
  href: string = '';
  taskId: string = '';
  task: TaskType;
  showEditPerson: boolean = false;
  showEditStatus: boolean = false;
  newPerson: string = '';
  newStatus: string = ''

  constructor(private router: Router) {
    this.task = {
      name: '',
      status: '',
      deadline: '',
      priority: '',
      person: '',
      id: 0,
    }
  }

  ngOnInit() {
    this.href = this.router.url;
    this.taskId = this.href.replace(/[^\d-]/g, '');
    this.task = JSON.parse(localStorage.getItem(this.taskId.toString())!);
    this.newStatus = this.task.status;
    this.newPerson = this.task.person;
  }


  editDate(): void {
    this.task.person = this.newPerson;
    this.task.status = this.newStatus;
    localStorage.setItem(this.taskId, JSON.stringify(this.task));
    this.showEditPerson = false;
    this.showEditStatus = false;
  }

}
