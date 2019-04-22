import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../Book';
import { Category } from '../category';
import { FormControl } from '@angular/forms';
import { BookServiceService } from '../book-service.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BookDetailComponent implements OnInit {

  categoryList: Category[] = [];
  book: Book = new Book();
  date = new FormControl(moment());
  dialogTitle: string;
  mode : string = 'NEW';

  constructor(public dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private bookService: BookServiceService) {
  }

  ngOnInit() {
    if (this.data.mode === 'EDIT') {
      this.mode = 'EDIT';
      this.dialogTitle = 'Edit Book';
      this.getBookDetails(this.data.bookId);
    } else {
      this.dialogTitle = 'Add New Book';
    }

    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategoryList()
      .subscribe(result => {
        this.categoryList = result;
      }, error => {
        console.log(error);
      });
  }

  getBookDetails(bookId: number) {
    this.bookService.getBookDetails(bookId)
      .subscribe(result => {
        this.book = result;
        this.date.setValue(this.book.publishDate);
      });
  }
  saveBook() {
    this.book.publishDate = moment(this.date.value).format('YYYY-MM-DD');
    this.bookService.addUpdateBook(this.book, this.mode)
      .subscribe(result => {
        this.dialogRef.close(true);
      }, error => {
        console.log(error);
      });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
