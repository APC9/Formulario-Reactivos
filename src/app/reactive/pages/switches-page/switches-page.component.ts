import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person{
  gender: string;
  wantNotification: boolean;
}

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: [ 'M', Validators.required ],
    wantNotification: [ true, Validators.required ],
    termsAndCoditions: [ false, Validators.requiredTrue ]
  });

  public person:Person = {
    gender:'F',
    wantNotification: false
  }

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
      this.myForm.reset(this.person)
  }

  isValidField( field: string ): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors ||  {};

    for (const key of Object.keys(errors) ) {
      switch(key){
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`
      }
    }

    return null;
  }

  onSave(){
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    const { gender, wantNotification } = this.myForm.value;
    this.person = { gender , wantNotification };
    
    console.log( this.person )
    console.log( this.myForm.value)
  }

}
