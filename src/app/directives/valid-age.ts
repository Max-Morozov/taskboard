import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[validAge]',
    providers: [{provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true}]
})
export class AgeValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        let ageEntered: number = control.value;
        console.log('ddd');
        return ageEntered < 12 || ageEntered > 123 ? {invalidAge: {value: control.value}} : null;
    }
}