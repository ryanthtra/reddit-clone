export class Article {
  public publishedAt: Date;

  // Shorthand form of both declaring properties for the class and initializing them for and instance.
  constructor(
    public title: string,
    public description: string,
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
