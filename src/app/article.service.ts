import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';
import { environment } from '../environments/environment';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticles(): Promise<Article[]> {
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
