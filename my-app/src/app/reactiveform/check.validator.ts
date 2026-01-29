import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom Validator: Kiểm tra tên không chứa ký tự đặc biệt
export function customValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null;
    }
    
    const matchName = regex.test(control.value);
    return matchName ? null : {'nameNotMatch': {value: control.value}};
  };
}

// Cross Field Validator: Kiểm tra password và confirmPassword khớp nhau
export function passwordValidator(control: AbstractControl): {[key: string]: any} | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPass');
  
  if (!password || !confirmPassword) {
    return null;
  }
  
  if (confirmPassword.pristine || password.pristine) {
    return null;
  }
  
  return password.value === confirmPassword.value 
    ? null 
    : {'misMatch': true};
}