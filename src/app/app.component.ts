import { 
  Component,
  Input 
} from '@angular/core';

import { Article } from './article';
import { ArticleService } from './article.service';

/**
 * COMPONENT
 * AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',   
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor(
    private articleService: ArticleService
  ) 
  {
    this.articles = [
      new Article(
        'The Angular 2 Screenast',
        'The easiest way to learn Angular 2 is with Fullstack.io!',
        10
      ),
      new Article(
        'Fullstack React',
        'Want to learn React too?'
      ),
      new Article(
        'Vue is new',
        'And pretty cool syntax too'
      ),
      new Article(
        'But what about elm?',
        'Everybody likes elm...right?'
      )
    ];
  }
}
