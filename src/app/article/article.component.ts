import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }
  
  upvote(): void {
    this.article.voteUp();
  }

  downvote(): void {
    this.article.voteDown();
  }
}
