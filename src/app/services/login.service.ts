import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8000"

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/usuario/login", { email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        this.router.navigate(['/user']);
      })
    )
  }

  signup(codigoIdentificador: string, nome: string, email: string, cargo: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/usuario/register", {codigoIdentificador, nome, email, cargo, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        this.router.navigate(['/login']);
      })
    )
  }
}