import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';

const baseUrl = 'https://newsapi.org';
const newsApiKey = '7523a5fbf8e448539d90f03e73f6aa5e';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticles(): Promise<Article[]> {
    let params = new URLSearchParams();
    params.set('apiKey', newsApiKey);
    params.set('source', 'reddit-r-all');
    return this.http
      .get(`${baseUrl}/v1/articles`, {
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
          .map(function(article) {
            return new Article(
              article.title,
              article.description,
              article.urlToImage
            );
          });
        console.log('articles->', articles);
        return list;
      })
      .catch(function(err) {
        console.log('We got an error', err);
      });
  }
}
