import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';
import { ValidatorsService } from '../../../shared/services/validators.service';



@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: [ '', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern) ]],
    email: [
      '', // Valor por defecto del input
      [Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ],//validacion sincrona
      // se puede usar asi [new EmailValidatorService()] // Validaciones asincronas
      [ this.emailValidatorService ]
    ],
    username: [ '', [Validators.required, this.validatorsService.cantBeStrider ]],
    password: [ '', [Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [Validators.required]],
  },{
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ){}

  isValidField(field:string):boolean | null{
    return this.validatorsService.isValidField(this.myForm, field)
  }

  onSubmit(){
    this.myForm.markAllAsTouched()
  }

}
