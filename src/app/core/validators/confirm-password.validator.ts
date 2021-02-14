import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl): any {
    const password = control.get('new_password1').value;

    const confirmPassword = control.get('new_password2').value;

    if (password !== confirmPassword) {
      control.get('new_password2').setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }
}
