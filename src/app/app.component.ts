import { 
  Component,
  Input 
} from '@angular/core';

export class Article {
  // Shorthand form of both declaring properties for the class and initializing them for and instance.
  constructor(
    public title: string,
    public description: string
  ) {}
}

@Component({
  selector: 'app-sidebar',
  template: `
  <div id="sidebar">
    Sidebar will go here
  </div>
  `
})
export class SidebarComponent
{

}

@Component({
  selector: "app-article",
  template: `
    <div class="image">
      <img src="https://placekitten.com/g/400/300" />
    </div>
    <div class="content">
      <div class="header">
        {{ article.title }}
      </div>
      <div class="meta">
        Voting and votes will go here
      </div>
      <div class="meta date">
        Today
      </div>
      <div class="meta description">
        <p>{{ article.description }}</p>
      </div>
      <div class="extra">
        <a
          href="#"
          target="_blank"
          class="ui right floated button primary">
            Read more
          <i class="right chevron icon"></i>
        </a>
      </div>
    </div>
  `
})
export class ArticleComponent
{
  @Input() article: Article;
}

/**
 * COMPONENT
 * AppComponent
 */
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <div class="ui container">
      <app-sidebar></app-sidebar>   
      <div class="ui divided items">
        <app-article
          *ngFor="let article of articles"
          [article]="article"
          class="item">
        </app-article>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor() 
  {
    this.articles = [
      new Article(
        'The Angular 2 Screenast',
        'The easiest way to learn Angular 2 is with Fullstack.io!'
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
