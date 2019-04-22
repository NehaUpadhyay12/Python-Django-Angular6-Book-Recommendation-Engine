import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://127.0.0.1:8000/bookengineapi/categories/';
  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl);
  }
}
