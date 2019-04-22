import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  baseUrl = 'http://127.0.0.1:8000/bookengineapi/';
  constructor(private httpClient: HttpClient) { }

  getBookList(searchText: string, searchByTitle: boolean): Observable<any[]> {
    let url = this.baseUrl + 'books/';
    if (searchText !== '') {
      if (searchByTitle) {
        url += '?title=' + searchText;
      } else {
        url += '?search=' + searchText;
      }
    }
    return this.httpClient.get<any[]>(url);
  }

  getBookDetails(bookId: number): Observable<Book> {
    const url = this.baseUrl + 'books/' + bookId + '/';
    return this.httpClient.get<Book>(url);
  }

  addUpdateBook(bookRecord: Book, mode: string): Observable<any> {
    if (mode === 'NEW') {
      const url = this.baseUrl + 'books/';
      return this.httpClient.post(url, bookRecord);
    } else {
      const url = this.baseUrl + 'books/' + bookRecord.pk + '/';
      return this.httpClient.put<any>(url, bookRecord);
    }
  }

  getRecommendations(bookId:number):Observable<any[]>{
    const url = this.baseUrl + 'books/?read=' + bookId;
    return this.httpClient.get<any[]>(url);
  }
  deleteBook(bookId:number):Observable<any>{
    const url = this.baseUrl + 'books/' + bookId + '/';
    return this.httpClient.delete<any>(url);
  }
}
