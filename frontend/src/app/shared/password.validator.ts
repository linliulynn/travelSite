import {AbstractControl} from '@angular/forms';
export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const passwordConfirmation = AC.get('passwordConfirmation').value;
    if (password !== passwordConfirmation) {
        AC.get('passwordConfirmation').setErrors( {MatchPassword: true} );
    } else {
        return null;
    }
  }
}
