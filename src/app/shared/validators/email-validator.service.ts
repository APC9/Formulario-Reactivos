import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

/*   validate(control: AbstractControl ): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email)

    return of({
      emailtaken: true
    })
  }
 */

  validate(control: AbstractControl ): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( subs => {

      console.log({email})
      if( email === 'test@mail.com'){
        subs.next( () => {emailTaken: true} );
        subs.complete()
      }

      subs.next( () => null );
      subs.complete()

    }).pipe(
      delay(3000)
    )

    return httpCallObservable;
  }

}
