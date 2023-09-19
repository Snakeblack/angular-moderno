import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Users } from '../common/interfaces/users';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
    private injector: Injector // para que funcione el signal
  ) {}

  // public getUsers(): Observable<Users[]> {
  public getUsers(): Signal<Users[]> {
    // return this.http.get<Users[]>(this.baseUrl);
    return toSignal(this.http.get<Users[]>(this.baseUrl), {
      initialValue: [],
      injector: this.injector, // para que funcione el signal
    });
  }
}
