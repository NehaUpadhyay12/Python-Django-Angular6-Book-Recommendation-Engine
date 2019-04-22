import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRecommendationComponent } from './book-recommendation.component';

describe('BookRecommendationComponent', () => {
  let component: BookRecommendationComponent;
  let fixture: ComponentFixture<BookRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
