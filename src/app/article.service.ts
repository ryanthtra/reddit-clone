import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';
import { environment } from '../environments/environment';

/**
 * [].sort(compare(a,b))
 * return value
 *  0 == they are equal
 *  1 == a before b
 *  -1 == b before a
 */
interface ArticleSortFn
{
  (a: Article, b: Article): number;
}

interface ArticleSortOrderFn
{
  (direction: number): ArticleSortFn;
}

const sortByTime: ArticleSortOrderFn = 
  (direction: number) => (a: Article, b: Article) =>
  {
    return direction * (b.publishedAt.getTime() - a.publishedAt.getTime());
  };

const sortByVotes: ArticleSortOrderFn = 
  (direction: number) => (a: Article, b: Article) =>
  {
    return direction * (b.votes - a.votes);
  };

const sortFn = {
  'Time': sortByTime,
  'Votes': sortByVotes
};

@Injectable()
export class ArticleService 
{
  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  private _sortByDirectionSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private _sortByFilterSubject: BehaviorSubject<ArticleSortOrderFn> = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);

  private _filterbySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public articles: Observable<Article[]> = this._articles.asObservable();
  
  public orderedArticles: Observable<Article[]>;

  constructor(private http: Http) 
  { 
    this.orderedArticles = Observable.combineLatest(
      this._articles,
      this._sortByFilterSubject,
      this._sortByDirectionSubject,
      this._filterbySubject
    )
    .map(([
      articles, sorter, direction, filterStr
    ]) => 
    {
      const re = new RegExp(filterStr, 'gi');
      return articles.filter(function(article) 
      {
        return (re.exec(article.title) || re.exec(article.description));
      }).sort(sorter(direction));
    });
  }

  public sortBy(
    filter: string,
    direction: number
  ): void
  {
    this._sortByDirectionSubject.next(direction);
    this._sortByFilterSubject.next(sortFn[filter]);
  }

  public filterBy(filter: string)
  {
    this._filterbySubject.next(filter);
  }

  public getArticles(): void 
  {
    // Make the http reuest -> Observable
    this._makeHttpRequest('/v1/articles', 'reddit-r-all')  // Returns Observable
      .map(json => json.articles)
      .subscribe(articlesJSON => 
      {
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
  ): Observable<any> 
  {  // Observable with JSON response
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', sourceKey);
    return this.http
      .get(`${environment.baseUrl}${path}`, 
      {
        search: params
      })
      .map(function(resp)
      {
        return resp.json();
      });
  }

  public getArticlesAsPromise(): Promise<Article[]> 
  {
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', 'reddit-r-all');
    return this.http
      .get(`${environment.baseUrl}/v1/articles`, 
      {
        search: params
      })
      .toPromise()
      .then(function(resp)
      {
        return resp.json();
      })
      .then(function(json) 
      {
        return json.articles;
      })
      .then(function(articles) 
      {
        const list = articles
          .map(article => Article.fromJSON(article));
        console.log('articles->', articles);
        return list;
      })
      .catch(function(err) 
      {
        console.log('We got an error', err);
      });
  }
}
