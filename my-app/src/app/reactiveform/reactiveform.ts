import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customValidator, passwordValidator } from './check.validator';

@Component({
  selector: 'app-reactiveform',
  standalone: false,
  templateUrl: './reactiveform.html',
  styleUrl: './reactiveform.css',
})
export class Reactiveform {
  // Khai báo FormGroup
  public regForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Tạo form với FormBuilder
    this.regForm = this._formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(3),
        customValidator(/^[a-zA-ZÀ-ỹ\s]+$/)  // Chỉ cho phép chữ cái (có dấu) và khoảng trắng
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPass: ['', Validators.required]
    }, {
      validators: passwordValidator  // Cross-field validation
    });
  }

  // Getter để truy cập controls dễ dàng hơn
  get name() {
    return this.regForm.get('name');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get confirmPass() {
    return this.regForm.get('confirmPass');
  }

  // Load dữ liệu mẫu (setValue - phải có đủ tất cả fields)
  setDefaultValues() {
    this.regForm.setValue({
      name: 'Thu Diệp',
      email: 'test@gmail.com',
      password: '',
      confirmPass: ''
    });
  }

  // Load dữ liệu một phần (patchValue - chỉ update một số fields)
  loadData() {
    this.regForm.patchValue({
      name: 'Huỳnh Giao',
      email: 'test@gmail.com'
    });
  }

  // Reset form
  resetForm() {
    this.regForm.reset();
  }

  // Submit form
  onSubmit() {
    if (this.regForm.valid) {
      console.log('Form Data:', this.regForm.value);
      alert('Đăng ký thành công!\n' + JSON.stringify(this.regForm.value, null, 2));
    } else {
      console.log('Form is invalid');
      // Đánh dấu tất cả fields là touched để hiển thị lỗi
      Object.keys(this.regForm.controls).forEach(key => {
        this.regForm.get(key)?.markAsTouched();
      });
    }
  }
}