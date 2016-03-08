import {Control, ControlGroup} from 'angular2/common';

interface ValidationResult {
    [key: string]: boolean;
}

export class EmailValidator {

    static invalidEmail(control: Control): ValidationResult {

        const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (!emailRegex.test(control.value)) {
            return { "invalidEmail": true };
        }

        return null;
    }
}

export class PasswordValidator {

    static compare(passwordKey: string, passwordConfirmationKey: string) {
        
        return (group: ControlGroup) => {
            
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ "notEquivalent": true })
            }
        }
    }
}