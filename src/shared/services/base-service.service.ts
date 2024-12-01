import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor(private httpClient: HttpClient) {
  }

  public toPost(url: string, body, options): Observable<any> {
    return this.httpClient.post(url, body, options);
  }

  public toGet(url: string, options): Observable<any> {
    return this.httpClient.get(url, options);
  }

  public toPut(url: string, body, options): Observable<any> {
    return this.httpClient.put(url, body, options);
  }

  public toDelete(url: string, options): Observable<any> {
    return this.httpClient.delete(url, options);
  }
}
