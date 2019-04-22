import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { BookServiceService } from '../book-service.service';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { Book } from '../Book';
import { BookRecommendationComponent } from '../book-recommendation/book-recommendation.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'author', 'publishDate', 'edition', 'categoryName', 'action'];
  bookList: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookServiceService, public dialog: MatDialog,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getBookList('', false);
  }

  getBookList(searchText: string, searchByTitle: boolean) {
    this.bookService.getBookList(searchText, searchByTitle)
      .subscribe(result => {
        this.bookList = new MatTableDataSource(result);
        this.bookList.paginator = this.paginator;
        this.bookList.sort = this.sort;
      },
        error => {
          console.log(error);
        });
  }

  searchByTitle(title: string) {
    this.getBookList(title, true);
  }

  searchByAnyValue(searchText: string) {
    this.getBookList(searchText, false);
  }

  addBook() {
    const dialogRef = this.dialog.open(BookDetailComponent, {
      width: '800px',
      data: { bookId: -1, mode: 'NEW' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getBookList('', false);
        this.snackBar.open('Book has been created successfully!', '', {
          duration: 5000
        });
      }
    });
  }

  editBook(id) {
    const dialogRef = this.dialog.open(BookDetailComponent, {
      width: '800px',
      data: { bookId: id, mode: 'EDIT' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getBookList('', false);
        this.snackBar.open('Book has been updated successfully!', '', {
          duration: 5000
        });
      }
    });
  }

  readBook(book: Book) {
    book.status = 'Read';
    this.bookService.addUpdateBook(book, 'EDIT')
    .subscribe(result => {
      const dialogRef = this.dialog.open(BookRecommendationComponent, {
        width: '800px',
        height: '600px',
        data: { bookId: book.pk, bookTitle: book.title }
      });
    });
  }

  deleteBook(id) {
    this.bookService.deleteBook(id)
      .subscribe(result => {
        this.getBookList('', false);
        this.snackBar.open('Book has been deleted successfully!', '', {
          duration: 5000
        });
      });
  }
}
