import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // public myform = new FormGroup({
  //   favoriteGame: new FormArray([])
  // })

  public newFavorite: FormControl = new FormControl('', Validators.minLength(3) )

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ] ],
    favoriteGame: this.fb.array([
      ['Metal Gear', Validators.required],
      [ 'Death stranding', Validators.required ]
    ])
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ){}

  get favoriteGames(){
    return this.myForm.get('favoriteGame') as FormArray;
  }


  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField( this.myForm, field )
  }

  isValidFieldInArray( formArray: FormArray, index: number ): boolean | null{
    return  this.validatorsService.isValidFieldInArray( formArray, index )
  }

  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError( this.myForm, field)
  }

  onAddToFavorites():void{
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    )

    this.newFavorite.reset()

  }

  onDeleteFavorite( index: number){
    this.favoriteGames.removeAt(index)
  }

  onSubmit():void{
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return
    }

    console.log( this.myForm.value );
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }

}
