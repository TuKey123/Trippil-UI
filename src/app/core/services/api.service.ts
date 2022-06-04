import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppNotify, parseJstoPy, parsePytoJs } from '../utils';
import { API_URL } from '../config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  get<T>(url: string, hideErrorMessage?: boolean): Observable<T> {
    return this.httpClient.get<T>(`${API_URL}/${url}`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((data) => parsePytoJs(data)) as any as T;
        }
        return parsePytoJs(response) as T;
      }),
      catchError((error) => this.handleError(error, url, hideErrorMessage))
    );
  }

  getWithOptions<T>(url: string, params: {}): Observable<T> {
    return this.httpClient.get<T>(`${API_URL}/${url}`, { params }).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((data) => parsePytoJs(data)) as any as T;
        }
        return parsePytoJs(response) as T;
      }),
      catchError((error) => this.handleError(error, url))
    );
  }

  post<T>(url: string, data: any, hideErrorMessage?: boolean): Observable<T> {
    return this.httpClient.post<T>(`${API_URL}/${url}`, parseJstoPy(data)).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((data) => parsePytoJs(data)) as any as T;
        }
        return parsePytoJs(response) as T;
      }),
      catchError((error) => this.handleError(error, url, hideErrorMessage))
    );
  }

  postFile<T>(
    url: string,
    files: File[],
    hideErrorMessage?: boolean
  ): Observable<HttpEvent<T>> {
    const formData: FormData = new FormData();
    for (const file of files) {
      formData.append(file.name, file, file.name);
    }
    const uploadReq = new HttpRequest('POST', `${API_URL}/${url}`, formData, {
      reportProgress: true,
    });

    return this.httpClient.request(uploadReq);
  }

  update<T>(url: string, data: any, hideErrorMessage?: boolean): Observable<T> {
    return this.httpClient.put<T>(`${API_URL}/${url}`, parseJstoPy(data)).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((data) => parsePytoJs(data)) as any as T;
        }
        return parsePytoJs(response) as T;
      }),
      catchError((error) => this.handleError(error, url, hideErrorMessage))
    );
  }

  delete<T>(
    url: string,
    data?: any | null,
    hideErrorMessage?: boolean
  ): Observable<T> {
    return this.httpClient
      .delete<T>(`${API_URL}/${url}`, parseJstoPy({ body: data }))
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((data) => parsePytoJs(data)) as any as T;
          }
          return parsePytoJs(response) as T;
        }),
        catchError((error) => this.handleError(error, url, hideErrorMessage))
      );
  }

  private handleError(
    response: HttpErrorResponse,
    requestUrl?: string,
    hideErrorMessage?: boolean
  ) {
    //
    if (response.status === 403) {
      return throwError('Permission Denied');
    }
    //
    if (response.status === 500) {
      let error = response.error ? response.error.message : response.statusText;
      if (!error) {
        error = 'Internal Server Error';
      }
      if (!hideErrorMessage) {
        AppNotify.error(error);
      }

      return throwError(response);
    }
    //
    let messageError = '';
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
          `body was: ${response.error}`
      );
    }

    if (!!response.error && !!response.error.message) {
      messageError = response.error.message;
    } else {
      messageError = 'Something Bad Happened';
    }
    if (!hideErrorMessage) {
      AppNotify.error(messageError);
    }

    // return an observable with a user-facing error message
    return throwError(response?.error);
  }
}
