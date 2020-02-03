import { BehaviorSubject } from 'rxjs';

export const token$ = new BehaviorSubject(localStorage.getItem('token') || null);
export function updateToken(token) {
  if(!token){
    localStorage.removeItem('token');
  } else{
    localStorage.setItem('token', token);
  }

 token$.next(token);
}
