import {Component, Input, OnInit} from '@angular/core';
import {TaskType} from "../../../types/task.type";

@Component({
  selector: 'task-item',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  @Input() task: TaskType;
  constructor() {
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

  }
}
