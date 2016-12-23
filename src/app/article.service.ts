import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Article } from './article';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticles(): Promise<Article[]> {
    // return Promise.resolve([
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve([
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
        ]);
      }, 
      2000)
    });
  }
}
