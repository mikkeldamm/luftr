import {Component} from '@angular/core';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from '@angular/common';

import {AngularFire} from 'angularfire2';

@Component({
    selector: 'profileInfo',
    styles: [require('./profileInfo.scss')],
    template: require('./profileInfo.html'),
    directives: [FORM_DIRECTIVES]
})
export class ProfileInfo {

    profileForm: ControlGroup;
    name: Control;
    profilePicture: Control;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        
    }
    
    ngOnInit() {
        
        this.name = new Control("", Validators.required);
        this.profilePicture = new Control("", Validators.required);

        this.profileForm = this._formBuilder.group({
            name: this.name,
            profilePicture: this.profilePicture
        });
    }
    
    save(event) {

        event.preventDefault();
        
        if (this.profileForm.valid) {
            
        }
    }
}