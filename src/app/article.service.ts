import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';
import { environment } from '../environments/environment';

@Injectable()
export class ArticleService {
  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  public articles: Observable<Article[]> = this._articles.asObservable();

  constructor(private http: Http) { }

  public getArticles(): void {
    // Make the http reuest -> Observable
    this._makeHttpRequest('/v1/articles', 'reddit-r-all')  // Returns Observable
      .map(json => json.articles)
      .subscribe(articlesJSON => {
    // Convert response into article class
        const articles = articlesJSON
          .map(articlejson => Article.fromJSON(articlejson));
    // Update our subject
        this._articles.next(articles);
      });
  }

  private _makeHttpRequest(
    path: string,
    sourceKey: string
  ): Observable<any> {  // Observable with JSON response
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', sourceKey);
    return this.http
      .get(`${environment.baseUrl}${path}`, {
        search: params
      })
      .map(function(resp){
        return resp.json();
      });
  }

  public getArticlesAsPromise(): Promise<Article[]> {
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', 'reddit-r-all');
    return this.http
      .get(`${environment.baseUrl}/v1/articles`, {
        search: params
      })
      .toPromise()
      .then(function(resp){
        return resp.json();
      })
      .then(function(json) {
        return json.articles;
      })
      .then(function(articles) {
        const list = articles
          .map(article => Article.fromJSON(article));
        console.log('articles->', articles);
        return list;
      })
      .catch(function(err) {
        console.log('We got an error', err);
      });
  }
}
