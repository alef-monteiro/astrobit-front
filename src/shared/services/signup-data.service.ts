import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// POSSIVELMENTE VÁ SER DELETADO.


@Injectable({
  providedIn: 'root'
})
export class SignupDataService {
  private signupData: any = {};

  constructor(private httpClient: HttpClient) {
  }

  // Salvar os dados parciais de cada página
  saveData(page: string, data: any) {
    this.signupData[page] = data;
  }

  // Obter os dados completos para enviar ao backend
  getCompleteData() {
    return this.signupData;
  }

  // Limpar os dados após o envio
  clearData() {
    this.signupData = {};
  }

  // // Enviar os dados completos para o backend
  // submitData(): Observable<any> {
  //   const url = 'https://localhost:8000/register';
  //   const completeData = this.getCompleteData();
  //
  //   // Enviando os dados completos para o backend
  //   return this.httpClient.post<SignupResponse>(url, completeData);
  // }
  //
  //
  // // Obter lista de assuntos
  // getSubjectList(): Observable<SubjectResponse> {
  //   const url = 'https://localhost:8000/subjects';
  //   return this.httpClient.get<SubjectResponse>(url);
  // }
}
