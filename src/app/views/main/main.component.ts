import {Component, OnInit} from '@angular/core';
import {TaskType} from "../../../types/task.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  isShow: boolean = false;
  showStatusFilter: boolean = false;
  showPersonsFilter: boolean = false;
  showDateFilter: boolean = false;
  upDownStatus: boolean = false;
  upDownDate: boolean = false;
  upDownName: boolean = false;
  nameTask: string = '';
  taskId:number = 0;
  statusTask: string = '';
  deadlineTask: string = '';
  priorityTask: string = '';
  personTask: string = '';
  tasks: TaskType;
  tasksList: TaskType[] = [];
  defaultList: TaskType[] = [];
  statusFilterApplied: string[] = [];
  personsFilterApplied: string[] = [];
  dateFilterApplied: string[] = [];
  arr1: TaskType[] = [];
  arr2: any[] | undefined = [];
  arr3: TaskType[] = [];
  arr4: any[] = [];
  personsList: string[] = []
  selected: Date | null | undefined;

  constructor(private _snackBar: MatSnackBar) {
    this.tasks = {
      name: '',
      status: '',
      deadline: '',
      priority: '',
      person: '',
      id: 0,
    }
  }

  ngOnInit() {
    this.tasksProcess();
    this.tasksList.forEach((el => {
      this.personsList.push(el.person);
    }))
    this.personsList = [...new Set(this.personsList)];
  }


  tasksProcess(): void {
    let lengthStorage: number = localStorage.length;
    this.tasksList = [];
    if (lengthStorage > 0) {
      for (let i: number = 1; i <= localStorage.length; i++) {
        this.tasks = JSON.parse(localStorage.getItem(i.toString())!);
        this.tasksList.push(this.tasks)
      }
    }
    this.tasksList.forEach((item: TaskType, i: number): void => {
      item.id = i + 1;
    });
    this.defaultList = this.tasksList;
  }

  createTask(): void {
    let createData: TaskType = {
      name: this.nameTask,
      status: this.statusTask,
      deadline: this.deadlineTask,
      priority: this.priorityTask,
      person: this.personTask,
      id: this.taskId,
    };

    let lengthStorage: number = localStorage.length;

    if (lengthStorage < 1) {
      let number: string = '1';
      localStorage.setItem(number, JSON.stringify(createData));
    } else {
      let number: string = (lengthStorage + 1).toString();
      localStorage.setItem(number, JSON.stringify(createData));
    }
    this.tasksProcess();
    this.isShow = false;
    this._snackBar.open('Новая задача успешно добавлена. Чтобы ее редактировать нажмите на название');
  }

  statusSorting(): void {
    if (!this.upDownStatus) {
      const key = 'status';
      this.tasksList.sort((task1, task2) => task1[key] > task2[key] ? -1 : 1);
      this.upDownStatus = true;
    } else {
      const key = 'status';
      this.tasksList.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
      this.upDownStatus = false;
    }
  }

  dateSorting(): void {
    if (!this.upDownDate) {
      const key = 'deadline';
      this.tasksList.sort((task1: TaskType, task2: TaskType) => task1[key] > task2[key] ? -1 : 1);
      this.upDownDate = true;
    } else {
      const key = 'deadline';
      this.tasksList.sort((task1: TaskType, task2: TaskType) => task1[key] > task2[key] ? 1 : -1);
      this.upDownDate = false;
    }
  }

  personSorting() {
    if (!this.upDownName) {
      const key = 'person';
      this.tasksList.sort((task1: TaskType, task2: TaskType) => task1[key] > task2[key] ? -1 : 1);
      this.upDownName = true;
    } else {
      const key = 'person';
      this.tasksList.sort((task1: TaskType, task2: TaskType) => task1[key] > task2[key] ? 1 : -1);
      this.upDownName = false;
    }
  }

  statusFilter(status: string, checked: boolean): void {
    this.arr2 = [];
    const foundedStatus: string | undefined = this.statusFilterApplied.find(el => status === el);
    if (foundedStatus) {
      this.statusFilterApplied = this.statusFilterApplied.filter((el: string) => el !== status);
      console.log(this.statusFilterApplied);
    } else {
      this.statusFilterApplied.push(status);
    }

    for (let i: number = 0; i < this.statusFilterApplied.length; i++) {
      this.arr1 = this.defaultList.filter((el: TaskType) => el.status === this.statusFilterApplied[i]);
      this.arr2.push(this.arr1);
      console.log(this.arr1);
      this.tasksList = this.arr2.flat();
    }

    if (this.statusFilterApplied.length < 1) {
      this.tasksList = this.defaultList;
    }
  }


  personsFilter(person: string): void {
    this.arr4 = [];
    const foundedStatus: string | undefined = this.personsFilterApplied.find(el => person === el);
    if (foundedStatus) {
      this.personsFilterApplied = this.personsFilterApplied.filter((el) => el !== person);
      console.log(this.personsFilterApplied);
    } else {
      this.personsFilterApplied.push(person);
    }

    for (let i: number = 0; i < this.personsFilterApplied.length; i++) {
      this.arr3 = this.defaultList.filter((el) => el.person === this.personsFilterApplied[i]);
      this.arr4.push(this.arr3);
      this.tasksList = this.arr4.flat();
    }

    if (this.personsFilterApplied.length < 1) {
      this.tasksList = this.defaultList;
    }
  }

  dateFilter(): void {
    this.selected?.setDate(this.selected?.getDate() + 1);
    let date: string | undefined = this.selected?.toISOString().split('T')[0];
    this.dateFilterApplied = [];
    if (date != null) {
      this.dateFilterApplied.push(date);
    }
      this.tasksList = this.defaultList.filter((el: TaskType) => el.deadline === this.dateFilterApplied[0]);
    if (this.dateFilterApplied.length < 1) {
      this.tasksList = this.defaultList;
    }
    this.selected?.setDate(this.selected?.getDate() - 1);
    this.showDateFilter = false;

    console.log(this.dateFilterApplied);
  }
}
