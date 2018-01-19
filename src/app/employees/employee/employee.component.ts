import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm, FormsModule } from '@angular/forms'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.onReset();
  }
  onSubmit(form: NgForm) {
    if (form.value.$key == null) {
      this.employeeService.insertEmployee(form.value);
      this.onReset(form);
    } else {
      this.employeeService.updateEmpl(form.value);
      this.onReset(form);
    }
  }

  onRecDel(form: NgForm) {
    this.employeeService.deleteEmp(form.value.$key)
  }
  onReset(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.employeeService.selectedEmployee = { name: '', office: "", position: "", salary: 0, $key: '' };
    }
  }
}