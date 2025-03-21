import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  constructor(protected http: HttpClient) { }

  protected handleError<T>(operation = 'operation', result?: T){
    return (error: HttpErrorResponse): Observable<T> => {
      let errorMessage = '';

      if(error.error instanceof ErrorEvent){
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        switch(error.status){
          case 404:
            errorMessage = 'Error 404: Resource not found!';
            break;
          case 500:
            errorMessage = 'Error 500: Internal server error!';
            break;
          case 400:
            errorMessage = 'Error 400: Bad request!';
            break;
          default:
            errorMessage = `Unexpected Error: ${error.status} - ${error.message}`;
        }
      }

      console.error(`${operation} failed: ${errorMessage}`);

      return result ? of(result) : throwError(() => ({ error: errorMessage }));
    }
  }
}
