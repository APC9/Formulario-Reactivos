import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';


const sillaGammer = {
  name: 'Razr',
  price: 120,
  inStorage: 12
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

  //  public myForm: FormGroup = new FormGroup({
  //    name: new FormControl(''),
  //    price: new FormControl(0),
  //    inStorage: new FormControl(0),
  //  });

  public myForm: FormGroup =  this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    price: [ 0, [Validators.required, Validators.min(0) ] ],
    inStorage: [ 0, [Validators.required, Validators.min(0) ] ],
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ){}

  ngOnInit(): void {
      //this.myForm.reset(sillaGammer)
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField( this.myForm, field )
  }

  getFieldError( field: string ){
    return this.validatorsService.getFieldError( this.myForm, field )
  }

  onSave():void{
    if ( this.myForm.invalid ) return;
    console.log(this.myForm.value);

    this.myForm.reset({price: 0, inStorage: 0 })
  }


}
