import { Component } from '@angular/core';
import { Student } from './student';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  studentModel = new Student(1, '', '', '', '', '', false);
  
  courses = ['Angular', 'React', 'Vue.js', 'Node.js', 'TypeScript'];
  
  errFlag = false;

  onSubmit() {
    console.log('Dữ liệu form:', this.studentModel);
    alert(`Đăng ký thành công!\nTên: ${this.studentModel.name}\nKhóa học: ${this.studentModel.course}\nCa học: ${this.studentModel.shift}`);
  }

  validateCourse(value: any): void {
    if (value === 'none' || value === '') {
      this.errFlag = true;
    } else {
      this.errFlag = false;
    }
  }
}