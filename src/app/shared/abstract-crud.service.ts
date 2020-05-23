import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSTANT_URL } from 'src/app/constants/constant-rest';

export abstract class AbstractCrudService<T extends any> {

  BASE_URL = CONSTANT_URL.BASE_URL;

  constructor(
    public http: HttpClient,
    public URL: string
  ) {
    this.BASE_URL += URL;
  }

  public getAll(): Observable<any> {
    const url = this.BASE_URL;
    return this.http.get(url);
  }
  public getAllFilterEntity(query): Observable<any> {
    const url = `${this.BASE_URL}?search=${query}`;
    return this.http.get(url);
  }
  public enableEntity(id: string, param): Observable<any>{
    return this.http.put(`${this.BASE_URL}enabled/${id}`, param);
  }
  public getOne(id: string): Observable<any> {
    const url = this.BASE_URL + id;
    return this.http.get(url);
  }

  public save(data: T | any): Observable<any> {
    const url = this.BASE_URL;
    return this.http.post(url, data);
  }

  public update(data: T): Observable<any> {
    const url = this.BASE_URL;
    return this.http.put(url, data);
  }

  public patch(data: T): Observable<any> {
    const url = this.BASE_URL;
    return this.http.patch(url, data);
  }

  public delete(id: string): Observable<any> {
    const url = this.BASE_URL + id;
    return this.http.delete(url);
  }

  public deleteList(data: T | any): Observable<any> {
    const url = this.BASE_URL + 'list/';
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data
    };
    return this.http.delete(url, options);
  }
}
