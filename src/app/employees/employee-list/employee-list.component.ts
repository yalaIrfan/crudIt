import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  employeeList: Employee[];

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key; 
        this.employeeList.push(y as Employee);
      });
    })
  }

  onDelete(emp: Employee) {
    if (confirm('Are you sure?') == true) {
      this.employeeService.selectedEmployee = Object.assign({}, emp);
    }
  }

  onItemClick(employee: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, employee)

  }
}