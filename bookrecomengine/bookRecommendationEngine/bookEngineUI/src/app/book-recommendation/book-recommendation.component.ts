import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../Book';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-book-recommendation',
  templateUrl: './book-recommendation.component.html',
  styleUrls: ['./book-recommendation.component.css']
})
export class BookRecommendationComponent implements OnInit {
  bookTitle: string;
  bookId: number;
  bookList: Book[] = [];
  constructor(public dialogRef: MatDialogRef<BookRecommendationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookServiceService) { }

  ngOnInit() {
    this.bookTitle = this.data.bookTitle;
    this.bookId = this.data.bookId;
    this.getRecommendations();
  }

  getRecommendations() {
    this.bookService.getRecommendations(this.bookId)
      .subscribe(result => {
        this.bookList = result;
      }, error => {
        console.log(error);
      })
  }
  cancel() {
    this.dialogRef.close();
  }
}
