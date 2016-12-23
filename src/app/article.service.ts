import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';

const baseUrl = 'https://newsapi.org';
const apiKey = '7523a5fbf8e448539d90f03e73f6aa5e';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticles(): Promise<Article[]> {
    return this.http
      .get(`${baseUrl}/v1/articles`)
      .toPromise()
      .then(function(resp){
        return resp.json();
      })
      .then(function(json)
      {
        console.log('json->', json);
        return json;
      });
  }
}
