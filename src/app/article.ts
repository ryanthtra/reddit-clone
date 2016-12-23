export interface ArticleJSON {
  title: string;
  url: string;
  votes: number;
  publishedAt: string;
  description: string;
  author: string;
  urlToImage: string;
}

export class Article {
  public publishedAt: Date;

  // Alternative "constructor"
  // Article.fromJSON()
  static fromJSON(json: ArticleJSON): Article {
    let article = Object.create(Article.prototype);
    return Object.assign(
      article,  // Target
      json,     // Source #1
      {         // Source #2
        imageUrl: json.urlToImage,
        votes: json.votes ? json.votes : 0,
        publishedAt: json.publishedAt ? new Date(json.publishedAt) : new Date()
      }
    );
  }

  // Shorthand form of both declaring properties for the class and initializing them for and instance.
  constructor(
    public title: string,
    public description: string,
    public imageUrl: string,
    public votes?: number
  ) {
    this.votes = votes || 0;
    this.publishedAt = new Date();
  }  

  public voteUp(): void {
    this.votes++;
  }

  public voteDown(): void {
    this.votes--;
  }
}
