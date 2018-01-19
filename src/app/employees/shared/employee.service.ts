import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NgForm } from '@angular/forms/src/directives/ng_form';


@Injectable()
export class EmployeeService {

  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();

  constructor(private firebase: AngularFireDatabase) { }


  getData() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }
  updateEmpl(emp: Employee) {
    this.employeeList.update(emp.$key, {
      name: emp.name,
      position: emp.position,
      office: emp.office,
      salary: emp.salary

    })
  }

  deleteEmp($key: string) {
    this.employeeList.remove($key);
  }

  insertEmployee(employee: Employee) {

    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary

    });



  }
}
