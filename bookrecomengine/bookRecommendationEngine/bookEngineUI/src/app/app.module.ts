import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
   MatInputModule, MatIconModule, MatButtonModule, MatDatepickerModule,
    MatSelectModule, MatDialogModule, MatNativeDateModule, MatSnackBarModule, MatListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { BookRecommendationComponent } from './book-recommendation/book-recommendation.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent,
    BookRecommendationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MomentDateModule,
    MatListModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents : [BookDetailComponent, BookRecommendationComponent]
})
export class AppModule { }
